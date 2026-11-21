package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.EstadoPedido;
import com.proyecto.restaurante.model.enums.MetodoPago;
import com.proyecto.restaurante.model.enums.TipoPedido;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table 
@Getter 
@Setter 
@NoArgsConstructor 
public class Pedido {
    private UUID id;
    private TipoPedido tipoPedido;
    private EstadoPedido estado;
    private LocalDateTime creadoEn;
    private LocalDateTime limiteAceptacion;
    private LocalDateTime aceptadoEn;
    private LocalDateTime limiteModificacion;
    private LocalDateTime ingresoColaChef;
    private LocalDateTime fechaEstimadaEntrega;
    private LocalDateTime fechaEntregaReal;
    private Double latitudRepartidor;
    private Double longitudRepartidor;
    private String rutaEncoded;
    private BigDecimal subtotal;
    private BigDecimal impuestos;
    private BigDecimal costoEnvio;
    private BigDecimal descuentoTotal;
    private BigDecimal propinaRepartidor;
    private BigDecimal total;
    private Integer divisionesCuenta;
    private MetodoPago metodoPago;
    private Boolean solicitaFactura;
    private String rfcFacturacion;
    private Boolean pagado;
}
