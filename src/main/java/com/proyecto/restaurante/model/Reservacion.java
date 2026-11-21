package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.EstadoReservacion;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import kotlin.uuid.Uuid;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "reservaciones")
@Getter 
@Setter 
@NoArgsConstructor 
public class Reservacion {
    private UUID id;
    private LocalDateTime fechaHoraCita;
    private LocalDateTime fechaHoraTolerancia;
    private Integer numPersonas;
    private BigDecimal anticipoPagado;
    private Boolean reagendada;
    private EstadoReservacion estado;
    private String folioCancelacion;
    private BigDecimal montoReembolso;
}
