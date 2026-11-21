package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.CategoriaEspecial;
import com.proyecto.restaurante.model.enums.TurnoMenu;

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
public class Platillo {
    private UUID id;
    private String nombre;
    private String descripcion;
    private BigDecimal precio;
    private BigDecimal costoExtra;
    private TurnoMenu turno;
    private CategoriaEspecial categoria;
    private Boolean enPromocion2x1;
    private BigDecimal porcentajePromoGlobal;
    private Boolean disponible;
}
