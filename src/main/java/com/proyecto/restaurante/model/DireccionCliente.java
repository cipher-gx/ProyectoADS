package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "direcciones_cliente")
@Getter
@Setter
@NoArgsConstructor
public class DireccionCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Usuario cliente;

    @Column(name = "direccion_texto", length = 255, nullable = false)
    private String direccionTexto;

    @Column(precision = 15, scale = 7, nullable = false)
    private BigDecimal latitud;

    @Column(precision = 15, scale = 7, nullable = false)
    private BigDecimal longitud;

    @DecimalMin(value = "0.0", message = "La distancia no puede ser negativa")
    @DecimalMax(value = "5.0", message = "Distancia máxima 5.0 km")
    @Column(name = "distancia_km", precision = 4, scale = 2, nullable = false)
    private BigDecimal distanciaKm;

    @Column(name = "es_principal", nullable = false)
    private Boolean esPrincipal = false;
}