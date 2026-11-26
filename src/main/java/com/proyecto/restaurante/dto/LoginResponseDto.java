package com.proyecto.restaurante.dto;

public record LoginResponseDto(
    String token,
    String nombre,
    String id,
    String rol
) {}