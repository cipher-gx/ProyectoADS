package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.EstadoPedido;
import com.proyecto.restaurante.model.enums.MetodoPago;
import com.proyecto.restaurante.model.enums.TipoPedido;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "pedidos")
@Getter
@Setter
@NoArgsConstructor
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id")
    private Usuario cliente;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesero_id")
    private Usuario mesero;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chef_id")
    private Usuario chef;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mesa_id")
    private Mesa mesa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "direccion_id")
    private DireccionCliente direccion;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_pedido", length = 20, nullable = false)
    private TipoPedido tipoPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado", length = 30, nullable = false)
    private EstadoPedido estado;

    @Column(name = "creado_en", nullable = false)
    private LocalDateTime creadoEn;

    @Column(name = "limite_aceptacion", nullable = false)
    private LocalDateTime limiteAceptacion;

    @Column(name = "aceptado_en")
    private LocalDateTime aceptadoEn;

    @Column(name = "limite_modificacion")
    private LocalDateTime limiteModificacion;

    @Column(name = "ingreso_cola_chef")
    private LocalDateTime ingresoColaChef;

    @Column(name = "fecha_estimada_entrega")
    private LocalDateTime fechaEstimadaEntrega;

    @Column(name = "fecha_entrega_real")
    private LocalDateTime fechaEntregaReal;

    @Column(name = "latitud_repartidor", precision = 10, scale = 7)
    private BigDecimal latitudRepartidor;

    @Column(name = "longitud_repartidor", precision = 10, scale = 7)
    private BigDecimal longitudRepartidor;

    @Column(name = "ruta_encoded", columnDefinition = "TEXT")
    private String rutaEncoded;

    @Column(name = "subtotal", precision = 10, scale = 2, nullable = false)
    private BigDecimal subtotal;

    @Column(name = "impuestos", precision = 10, scale = 2, nullable = false)
    private BigDecimal impuestos;

    @Column(name = "costo_envio", precision = 10, scale = 2)
    private BigDecimal costoEnvio = BigDecimal.ZERO;

    @Column(name = "descuento_total", precision = 10, scale = 2)
    private BigDecimal descuentoTotal = BigDecimal.ZERO;

    @Column(name = "propina_repartidor", precision = 10, scale = 2)
    private BigDecimal propinaRepartidor = BigDecimal.ZERO;

    @Column(name = "total", precision = 10, scale = 2, nullable = false)
    private BigDecimal total;

    @Column(name = "divisiones_cuenta", nullable = false)
    private Integer divisionesCuenta = 1;

    @Enumerated(EnumType.STRING)
    @Column(name = "metodo_pago", length = 20, nullable = false)
    private MetodoPago metodoPago;

    @Column(name = "solicita_factura", nullable = false)
    private Boolean solicitaFactura = false;

    @Column(name = "rfc_facturacion", length = 13)
    private String rfcFacturacion;

    @Column(name = "pagado")
    private Boolean pagado = false;
}