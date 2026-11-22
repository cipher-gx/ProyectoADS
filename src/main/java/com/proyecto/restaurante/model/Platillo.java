package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.CategoriaEspecial;
import com.proyecto.restaurante.model.enums.TurnoMenu;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "platillos")
@Getter 
@Setter 
@NoArgsConstructor 
public class Platillo {
    @Id 
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;

    @Column (nullable = false, length = 120)
    private String nombre;

    @Column (nullable= false)
    private String descripcion;

    @Column (nullable = false, precision = 15, scale= 2)
    private BigDecimal precio;

    @Column (nullable = false, precision= 10, scale= 2)
    private BigDecimal costoExtra = BigDecimal.ZERO;

    @Column (nullable = false, length=20)
    @Enumerated(EnumType.STRING)
    private TurnoMenu turno;

    @Column (nullable = false, length=20)
    @Enumerated(EnumType.STRING)
    private CategoriaEspecial categoria;

    @Column(nullable = false)
    private Boolean enPromocion2x1 = false;

    @Column (nullable = false, precision= 5, scale= 2)
    private BigDecimal porcentajePromoGlobal = BigDecimal.ZERO;

    @Column(nullable = false)
    private Boolean disponible = true;
}
