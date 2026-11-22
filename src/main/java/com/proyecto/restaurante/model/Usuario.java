package com.proyecto.restaurante.model;

import java.time.LocalDate;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.RolUsuario;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumType;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "usuarios")
@NoArgsConstructor 
@Getter 
@Setter 
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 150)
    private String correo;

    @Column(name = "hash_password", nullable = false, length = 255)
    private String hash_password;

    @Column(nullable = false, length = 150)
    private String nombre;

    @Column(nullable = false, length = 20)
    private String telefono;

    @Column(nullable = true)
    private LocalDate fechadeNacimiento;

    @Column(nullable = false, length = 30)
    @Enumerated(EnumType.STRING)
    private RolUsuario rol;

    @Column(nullable = true, length = 255)
    private String direccionEmpleado;

    @Column(nullable = true, unique = true, length = 18)
    private String curp;

    @Column(nullable = true, unique = true, length = 13)
    private String rfc;

    @Column(nullable = true, length = 50)
    private String horarioLaboral;

    @Column(nullable = true, length = 500)
    private String urlIdentification;

    @Column(nullable = false)
    private Integer puntosLealtad = 0;

    @Column(nullable = false)
    private Integer tokenVersion = 0;

    @Column(nullable = false)
    private Boolean activo = true;
}
