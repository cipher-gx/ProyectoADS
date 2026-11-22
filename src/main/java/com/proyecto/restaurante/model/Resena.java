package com.proyecto.restaurante.model;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "resenas")
@Getter 
@Setter 
@NoArgsConstructor 
public class Resena {
    @Id  
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    @Min(1)
    @Max(5)
    private Integer estrellasServicio;

    @Column(nullable = false)
    @Min(1)
    @Max(5)
    private Integer estrellasProducto;

    @Column (nullable = false)
    private String comentario;

    @Column (nullable = false, length = 120)
    private String origenPlataforma;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime creadoEn;
}
