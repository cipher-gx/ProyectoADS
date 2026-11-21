package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.CategoriaEspecial;
import com.proyecto.restaurante.model.enums.EstadoPropuesta;
import com.proyecto.restaurante.model.enums.TipoAccionPropuesta;
import com.proyecto.restaurante.model.enums.TurnoMenu;

import jakarta.persistence.Entity;
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
    private UUID id;
    private TipoAccionPropuesta tipoAccion;
    private String nombrePlatillo;
    private String descripcion;
    private BigDecimal precioSugerido;
    private TurnoMenu turno;
    private CategoriaEspecial categoria;
    private EstadoPropuesta estado;
    private LocalDateTime creadoEn;


}
