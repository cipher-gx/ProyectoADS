package com.proyecto.restaurante.model;

import java.time.LocalDateTime;
import java.util.UUID;

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
public class Resena {
    private UUID id;
    private Integer estrellasServicio;
    private Integer estrellasProducto;
    private String comentario;
    private String origenPlataforma;
    private LocalDateTime creadoEn;
}
