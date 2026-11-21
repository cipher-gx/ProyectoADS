package com.proyecto.restaurante.model;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Table (name = "direcciones_cliente")
@Getter 
@Setter 
@NoArgsConstructor 
public class DireccionCliente {
    private UUID id;
    private String direccionTexto;
    private Double latitud;
    private Double longitud;
    private Double distanciaKm;
    private Boolean esPrincipal;
}
