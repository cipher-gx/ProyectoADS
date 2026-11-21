package com.proyecto.restaurante.model;

import java.util.UUID;

import com.proyecto.restaurante.model.enums.EstadoMesa;

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
public class Mesa {
    private UUID id;
    private Integer numeroMesa;
    private Integer capacidad;
    private EstadoMesa estado;
}
