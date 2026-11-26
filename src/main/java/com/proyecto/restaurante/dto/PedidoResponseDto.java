package com.proyecto.restaurante.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.EstadoPedido;
import com.proyecto.restaurante.model.enums.MetodoPago;
import com.proyecto.restaurante.model.enums.TipoPedido;

public record PedidoResponseDto(
    UUID id,
    UUID clienteId,
    String clienteNombre,
    String chefNombre,
    Integer numeroMesa,
    String direccionTexto,
    TipoPedido tipoPedido,
    EstadoPedido estado,
    LocalDateTime creadoEn,
    LocalDateTime limiteAceptacion,
    LocalDateTime aceptadoEn,
    LocalDateTime limiteModificacion,
    BigDecimal subtotal,
    BigDecimal impuestos,
    BigDecimal costoEnvio,
    BigDecimal descuentoTotal,
    BigDecimal propinaRepartidor,
    BigDecimal total,
    MetodoPago metodoPago,
    Boolean solicitaFactura,
    String rfcFacturacion,
    Boolean pagado,
    List<DetallePedidoResponseDto> detalles
) {}