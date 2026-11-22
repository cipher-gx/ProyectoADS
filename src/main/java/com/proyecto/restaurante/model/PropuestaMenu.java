package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import com.proyecto.restaurante.model.enums.CategoriaEspecial;
import com.proyecto.restaurante.model.enums.EstadoPropuesta;
import com.proyecto.restaurante.model.enums.TipoAccionPropuesta;
import com.proyecto.restaurante.model.enums.TurnoMenu;

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
@Table (name = "propuestas_menu")
@Getter 
@Setter 
@NoArgsConstructor 
public class PropuestaMenu {
    @Id 
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;

    @Column (nullable = false, length=20)
    @Enumerated(EnumType.STRING)
    private TipoAccionPropuesta tipoAccion;

    @Column (nullable = false, length = 120)
    private String nombrePlatillo;

    @Column (nullable = false)
    private String descripcion;

    @Column (nullable = true, precision = 15, scale= 2)
    private BigDecimal precioSugerido;

    @Column (nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private TurnoMenu turno;

    @Column (nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private CategoriaEspecial categoria;

    @Column (nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private EstadoPropuesta estado;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime creadoEn;
}
