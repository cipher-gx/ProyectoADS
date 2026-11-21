package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.TipoCupon;

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
public class CuponCliente {
    private UUID id;
    private String codigo;
    private TipoCupon tipoCupon;
    private BigDecimal descuento;
    private Boolean activo;
    private Boolean usado;
}
