package com.proyecto.restaurante.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "tokens_recuperacion")
@Getter 
@Setter 
@NoArgsConstructor 
public class TokenRecuperacion {
    
    private UUID id;
    private String codigo;
    private LocalDateTime creadoEn;
    private LocalDateTime fechaExpiracion;
    private Integer intentosFallidos;
    private Boolean usado;
}
