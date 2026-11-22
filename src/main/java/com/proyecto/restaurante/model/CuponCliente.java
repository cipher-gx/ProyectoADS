package com.proyecto.restaurante.model;

import java.math.BigDecimal;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.TipoCupon;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cupones_cliente")
@Getter
@Setter
@NoArgsConstructor
public class CuponCliente {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id", nullable = false)
    private Usuario cliente;

    @Column(nullable = false, length = 40, unique = true)
    private String codigo;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_cupon", nullable = false, length = 30)
    private TipoCupon tipoCupon;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal descuento;

    @Column(nullable = false)
    private Boolean activo = true;

    @Column(nullable = false)
    private Boolean usado = false;
}