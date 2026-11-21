package com.proyecto.restaurante.model;

import java.time.LocalDate;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.RolUsuario;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "usuarios")
@NoArgsConstructor 
@Getter 
@Setter 
public class Usuario {
    
    private UUID id;
    private String correo;
    private String hash_password;
    private String nombre;
    private String telefono;
    private Integer edad;
    private LocalDate fechadeNacimiento;
    private RolUsuario rol;
    private String direccionEmpleado;
    private String curp;
    private String rfc;
    private String horarioLaboral;
    private String urlIdentification;
    private Integer puntosLealtad;
    private Integer tokenVersion;
    private Boolean activo;
}
