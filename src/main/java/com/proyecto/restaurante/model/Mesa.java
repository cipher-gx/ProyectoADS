package com.proyecto.restaurante.model;

import java.util.UUID;

import com.proyecto.restaurante.model.enums.EstadoMesa;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table 
@Getter 
@Setter 
@NoArgsConstructor 
public class Mesa {
    @Id 
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;

    @Column (unique = true, nullable = false)
    private Integer numeroMesa;

    @Column (nullable = false)
    private Integer capacidad;

    @Column (nullable = false)
    @Enumerated (EnumType.STRING)
    private EstadoMesa estado;
}
