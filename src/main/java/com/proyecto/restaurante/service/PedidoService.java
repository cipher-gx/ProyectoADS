package com.proyecto.restaurante.service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.proyecto.restaurante.dto.DetallePedidoRequestDto;
import com.proyecto.restaurante.dto.DetallePedidoResponseDto;
import com.proyecto.restaurante.dto.ModificarPedidoDto;
import com.proyecto.restaurante.dto.PagoRequestDto;
import com.proyecto.restaurante.dto.PedidoRequestDto;
import com.proyecto.restaurante.dto.PedidoResponseDto;
import com.proyecto.restaurante.model.CuponCliente;
import com.proyecto.restaurante.model.DetallePedido;
import com.proyecto.restaurante.model.DireccionCliente;
import com.proyecto.restaurante.model.Mesa;
import com.proyecto.restaurante.model.Pedido;
import com.proyecto.restaurante.model.Platillo;
import com.proyecto.restaurante.model.Usuario;
import com.proyecto.restaurante.model.enums.EstadoPedido;
import com.proyecto.restaurante.model.enums.TipoPedido;
import com.proyecto.restaurante.repository.CuponClienteRepository;
import com.proyecto.restaurante.repository.DetallePedidoRepository;
import com.proyecto.restaurante.repository.DireccionClienteRepository;
import com.proyecto.restaurante.repository.MesaRepository;
import com.proyecto.restaurante.repository.PedidoRepository;
import com.proyecto.restaurante.repository.PlatilloRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final PlatilloRepository platilloRepository;
    private final MesaRepository mesaRepository;
    private final DireccionClienteRepository direccionClienteRepository;
    private final CuponClienteRepository cuponClienteRepository;
    private final DetallePedidoRepository detallePedidoRepository;

    private static final BigDecimal TASA_IVA = new BigDecimal("0.16");
    private static final BigDecimal COSTO_ENVIO_BASE = new BigDecimal("35.00");

    @Transactional
    public Pedido crearPedido(PedidoRequestDto dto, Usuario usuario) {
        Pedido pedido = new Pedido();
        pedido.setCliente(usuario);
        pedido.setTipoPedido(dto.getTipoPedido());
        pedido.setEstado(EstadoPedido.PENDIENTE_ACEPTACION);
        pedido.setPagado(false);
        pedido.setSolicitaFactura(false);
        pedido.setDescuentoTotal(BigDecimal.ZERO);
        pedido.setPropinaRepartidor(BigDecimal.ZERO);

        BigDecimal costoEnvio = BigDecimal.ZERO;
        if (dto.getTipoPedido() == TipoPedido.MESA) {
            if (dto.getMesaId() == null) {
                throw new RuntimeException("Debes especificar una mesa para pedidos en restaurante.");
            }
            Mesa mesa = mesaRepository.findById(dto.getMesaId())
                    .orElseThrow(() -> new RuntimeException("Mesa no encontrada."));
            pedido.setMesa(mesa);
        } else if (dto.getTipoPedido() == TipoPedido.DOMICILIO) {
            if (dto.getDireccionId() == null) {
                throw new RuntimeException("Debes especificar una dirección para pedidos a domicilio.");
            }
            DireccionCliente direccion = direccionClienteRepository.findById(dto.getDireccionId())
                    .orElseThrow(() -> new RuntimeException("Dirección no encontrada."));
            pedido.setDireccion(direccion);
            costoEnvio = COSTO_ENVIO_BASE;
        }
        pedido.setCostoEnvio(costoEnvio);

        List<DetallePedido> detalles = new ArrayList<>();
        BigDecimal subtotal = armarDetallesYSubtotal(dto.getDetalles(), detalles);

        BigDecimal impuestos = subtotal.multiply(TASA_IVA).setScale(2, RoundingMode.HALF_UP);
        BigDecimal total = subtotal.add(impuestos).add(costoEnvio);

        pedido.setSubtotal(subtotal);
        pedido.setImpuestos(impuestos);
        pedido.setTotal(total);

        LocalDateTime ahora = LocalDateTime.now();
        pedido.setCreadoEn(ahora);
        pedido.setLimiteAceptacion(ahora.plusMinutes(5));
        pedido.setLimiteModificacion(ahora.plusMinutes(5));

        Pedido pedidoGuardado = pedidoRepository.save(pedido);
        for (DetallePedido detalle : detalles) {
            detalle.setPedido(pedidoGuardado);
        }
        detallePedidoRepository.saveAll(detalles);

        return pedidoGuardado;
    }

    // ==================== COCINA (KDS) ====================

    public List<Pedido> obtenerTableroKds() {
        List<EstadoPedido> estadosActivos = List.of(
                EstadoPedido.PENDIENTE_ACEPTACION,
                EstadoPedido.ACEPTADO,
                EstadoPedido.STANDBY,
                EstadoPedido.EN_PREPARACION
        );
        return pedidoRepository.findByEstadoInOrderByCreadoEnAsc(estadosActivos);
    }

    @Transactional
    public Pedido aceptarPedido(UUID pedidoId, Usuario chef) {
        Pedido pedido = obtenerPedidoPorId(pedidoId);

        if (pedido.getEstado() != EstadoPedido.PENDIENTE_ACEPTACION) {
            throw new RuntimeException("Solo se pueden aceptar pedidos pendientes.");
        }

        LocalDateTime ahora = LocalDateTime.now();
        if (ahora.isAfter(pedido.getLimiteAceptacion())) {
            pedido.setEstado(EstadoPedido.CANCELADO);
            pedidoRepository.save(pedido);
            throw new RuntimeException("El tiempo límite para aceptar el pedido expiró.");
        }

        pedido.setChef(chef);
        pedido.setEstado(EstadoPedido.EN_PREPARACION);
        pedido.setAceptadoEn(ahora);
        pedido.setIngresoColaChef(ahora);

        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido marcarListo(UUID pedidoId) {
        Pedido pedido = obtenerPedidoPorId(pedidoId);

        if (pedido.getEstado() != EstadoPedido.EN_PREPARACION) {
            throw new RuntimeException("El pedido debe estar en preparación para marcarlo como listo.");
        }

        pedido.setEstado(EstadoPedido.LISTO);
        return pedidoRepository.save(pedido);
    }

    // ==================== MODIFICAR Y CANCELAR ====================

    @Transactional
    public Pedido modificarPedido(UUID pedidoId, ModificarPedidoDto dto, Usuario usuario) {
        Pedido pedido = obtenerPedidoPorId(pedidoId);

        if (!pedido.getCliente().getId().equals(usuario.getId())) {
            throw new RuntimeException("No tienes permiso para modificar este pedido.");
        }

        if (pedido.getLimiteModificacion() == null || LocalDateTime.now().isAfter(pedido.getLimiteModificacion())) {
            throw new RuntimeException("El tiempo límite para modificar el pedido ya expiró.");
        }

        if (Boolean.TRUE.equals(pedido.getPagado()) || pedido.getEstado() == EstadoPedido.CANCELADO) {
            throw new RuntimeException("No se puede modificar un pedido pagado o cancelado.");
        }

        if (dto.getDireccionId() != null && pedido.getTipoPedido() == TipoPedido.DOMICILIO) {
            DireccionCliente nuevaDireccion = direccionClienteRepository.findById(dto.getDireccionId())
                    .orElseThrow(() -> new RuntimeException("Dirección no encontrada."));
            pedido.setDireccion(nuevaDireccion);
        }

        // Reemplazar detalles anteriores
        List<DetallePedido> detallesAnteriores = detallePedidoRepository.findByPedidoId(pedidoId);
        detallePedidoRepository.deleteAll(detallesAnteriores);

        List<DetallePedido> nuevosDetalles = new ArrayList<>();
        BigDecimal nuevoSubtotal = armarDetallesYSubtotal(dto.getDetalles(), nuevosDetalles);

        for (DetallePedido detalle : nuevosDetalles) {
            detalle.setPedido(pedido);
        }
        detallePedidoRepository.saveAll(nuevosDetalles);

        BigDecimal nuevosImpuestos = nuevoSubtotal.multiply(TASA_IVA).setScale(2, RoundingMode.HALF_UP);
        pedido.setSubtotal(nuevoSubtotal);
        pedido.setImpuestos(nuevosImpuestos);
        recalcularTotal(pedido);

        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido cancelarPedido(UUID pedidoId, Usuario usuario) {
        Pedido pedido = obtenerPedidoPorId(pedidoId);

        if (!pedido.getCliente().getId().equals(usuario.getId())) {
            throw new RuntimeException("No tienes permiso para cancelar este pedido.");
        }

        if (pedido.getEstado() == EstadoPedido.LISTO
                || pedido.getEstado() == EstadoPedido.EN_CAMINO
                || pedido.getEstado() == EstadoPedido.ENTREGADO
                || pedido.getEstado() == EstadoPedido.CANCELADO) {
            throw new RuntimeException("El pedido ya no puede ser cancelado en su estado actual.");
        }

        pedido.setEstado(EstadoPedido.CANCELADO);
        return pedidoRepository.save(pedido);
    }

    // ==================== CUPONES Y PAGO ====================

    @Transactional
    public Pedido aplicarCupones(UUID pedidoId, List<String> codigos, Usuario usuario) {
        if (codigos == null || codigos.isEmpty()) {
            throw new RuntimeException("Debes enviar al menos un código de cupón.");
        }
        if (codigos.size() > 3) {
            throw new RuntimeException("Solo puedes aplicar un máximo de 3 cupones por pedido.");
        }

        Pedido pedido = obtenerPedidoPorId(pedidoId);

        if (Boolean.TRUE.equals(pedido.getPagado()) || pedido.getEstado() == EstadoPedido.CANCELADO) {
            throw new RuntimeException("No se pueden aplicar cupones a un pedido pagado o cancelado.");
        }

        BigDecimal descuentoAcumulado = pedido.getDescuentoTotal() != null ? pedido.getDescuentoTotal() : BigDecimal.ZERO;

        for (String codigo : codigos) {
            CuponCliente cupon = cuponClienteRepository.findByCodigoAndUsadoFalseAndActivoTrue(codigo)
                    .orElseThrow(() -> new RuntimeException("Cupón inválido, inactivo o ya usado: " + codigo));

            if (!cupon.getCliente().getId().equals(usuario.getId())) {
                throw new RuntimeException("El cupón " + codigo + " no pertenece a tu cuenta.");
            }

            descuentoAcumulado = descuentoAcumulado.add(cupon.getDescuento());
            cupon.setUsado(true);
            cuponClienteRepository.save(cupon);
        }

        pedido.setDescuentoTotal(descuentoAcumulado);
        recalcularTotal(pedido);

        return pedidoRepository.save(pedido);
    }

    @Transactional
    public Pedido procesarPago(UUID pedidoId, PagoRequestDto dto) {
        Pedido pedido = obtenerPedidoPorId(pedidoId);

        if (Boolean.TRUE.equals(pedido.getPagado())) {
            throw new RuntimeException("Este pedido ya fue pagado.");
        }
        if (pedido.getEstado() == EstadoPedido.CANCELADO) {
            throw new RuntimeException("No se puede pagar un pedido cancelado.");
        }

        pedido.setMetodoPago(dto.getMetodoPago());
        pedido.setPropinaRepartidor(dto.getPropinaRepartidor() != null ? dto.getPropinaRepartidor() : BigDecimal.ZERO);

        boolean solicitaFactura = Boolean.TRUE.equals(dto.getSolicitaFactura());
        pedido.setSolicitaFactura(solicitaFactura);
        if (solicitaFactura) {
            if (dto.getRfcFacturacion() == null || dto.getRfcFacturacion().isBlank()) {
                throw new RuntimeException("El RFC es obligatorio si solicitas factura.");
            }
            pedido.setRfcFacturacion(dto.getRfcFacturacion().trim().toUpperCase());
        }

        recalcularTotal(pedido);
        pedido.setPagado(true);

        return pedidoRepository.save(pedido);
    }

    // ==================== MAPPER A DTO ====================

    @Transactional(readOnly = true)
    public PedidoResponseDto mapearAResponse(Pedido pedido) {
        List<DetallePedidoResponseDto> detallesDto = detallePedidoRepository.findByPedidoId(pedido.getId())
                .stream()
                .map(d -> new DetallePedidoResponseDto(
                        d.getId(),
                        d.getPlatillo().getId(),
                        d.getPlatillo().getNombre(),
                        d.getCantidad(),
                        d.getPrecioUnitario(),
                        d.getCostoExtraUnitario()
                ))
                .toList();

        return new PedidoResponseDto(
                pedido.getId(),
                pedido.getCliente() != null ? pedido.getCliente().getId() : null,
                pedido.getCliente() != null ? pedido.getCliente().getNombre() : null,
                pedido.getChef() != null ? pedido.getChef().getNombre() : null,
                pedido.getMesa() != null ? pedido.getMesa().getNumeroMesa() : null,
                pedido.getDireccion() != null ? pedido.getDireccion().getDireccionTexto() : null,
                pedido.getTipoPedido(),
                pedido.getEstado(),
                pedido.getCreadoEn(),
                pedido.getLimiteAceptacion(),
                pedido.getAceptadoEn(),
                pedido.getLimiteModificacion(),
                pedido.getSubtotal(),
                pedido.getImpuestos(),
                pedido.getCostoEnvio(),
                pedido.getDescuentoTotal(),
                pedido.getPropinaRepartidor(),
                pedido.getTotal(),
                pedido.getMetodoPago(),
                pedido.getSolicitaFactura(),
                pedido.getRfcFacturacion(),
                pedido.getPagado(),
                detallesDto
        );
    }

    // ==================== HELPERS ====================

    private Pedido obtenerPedidoPorId(UUID pedidoId) {
        return pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado."));
    }

    private BigDecimal armarDetallesYSubtotal(List<DetallePedidoRequestDto> items, List<DetallePedido> detallesOut) {
        BigDecimal subtotal = BigDecimal.ZERO;
        for (DetallePedidoRequestDto item : items) {
            Platillo platillo = platilloRepository.findById(item.getPlatilloId())
                    .orElseThrow(() -> new RuntimeException("Platillo no encontrado: " + item.getPlatilloId()));

            if (Boolean.FALSE.equals(platillo.getDisponible())) {
                throw new RuntimeException("El platillo '" + platillo.getNombre() + "' no está disponible.");
            }

            DetallePedido detalle = new DetallePedido();
            detalle.setPlatillo(platillo);
            detalle.setCantidad(item.getCantidad());
            detalle.setPrecioUnitario(platillo.getPrecio());
            detalle.setCostoExtraUnitario(BigDecimal.ZERO);

            detallesOut.add(detalle);

            BigDecimal subtotalItem = platillo.getPrecio().multiply(BigDecimal.valueOf(item.getCantidad()));
            subtotal = subtotal.add(subtotalItem);
        }
        return subtotal;
    }

    private void recalcularTotal(Pedido pedido) {
        BigDecimal total = pedido.getSubtotal()
                .add(pedido.getImpuestos())
                .add(pedido.getCostoEnvio() != null ? pedido.getCostoEnvio() : BigDecimal.ZERO)
                .add(pedido.getPropinaRepartidor() != null ? pedido.getPropinaRepartidor() : BigDecimal.ZERO)
                .subtract(pedido.getDescuentoTotal() != null ? pedido.getDescuentoTotal() : BigDecimal.ZERO);

        pedido.setTotal(total.compareTo(BigDecimal.ZERO) < 0 ? BigDecimal.ZERO : total);
    }
}