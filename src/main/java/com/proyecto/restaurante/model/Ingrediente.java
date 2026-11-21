package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "ingredientes")
@NoArgsConstructor 
@Getter 
@Setter 
public class Ingrediente {
    private UUID id;
    private String nombre;
    private BigDecimal existenciaActual;
    private BigDecimal stockMinimo;
}
