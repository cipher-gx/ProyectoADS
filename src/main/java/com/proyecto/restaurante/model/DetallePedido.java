package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.util.UUID;

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
public class DetallePedido {
    private UUID id;
    private Integer cantidad;
    private BigDecimal precioUnitario;
    private String modificadoresElegidos;
    private BigDecimal costoExtraUnitario;
}
