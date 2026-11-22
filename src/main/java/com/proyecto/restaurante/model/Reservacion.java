package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.EstadoReservacion;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.EnumType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "reservaciones")
@Getter 
@Setter 
@NoArgsConstructor 
public class Reservacion {
    @Id 
    @GeneratedValue (strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaHoraCita;

    @Column(nullable = false, updatable = false)
    private LocalDateTime fechaHoraTolerancia;

    @Column(nullable = false)
    private Integer numPersonas;

    @Column (nullable = false, precision = 15, scale= 2)
    private BigDecimal anticipoPagado;

    @Column(nullable = false)
    private Boolean reagendada = false;

    @Column (nullable = false, length = 20)
    @Enumerated(EnumType.STRING)
    private EstadoReservacion estado;

    @Column (nullable = true, unique = true, length = 40)
    private String folioCancelacion;

    @Column (nullable = true, precision = 15, scale= 2)
    private BigDecimal montoReembolso;
}
