package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    @Id 
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;

    @Column (nullable = false)
    private String nombre;

    @Column (nullable = false, precision = 15,scale = 2)
    private BigDecimal existenciaActual;

    @Column (nullable = false, precision = 15, scale = 2)
    private BigDecimal stockMinimo;
}
