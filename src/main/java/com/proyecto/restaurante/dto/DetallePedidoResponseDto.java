package com.proyecto.restaurante.dto;

import java.math.BigDecimal;
import java.util.UUID;

public record DetallePedidoResponseDto(
    UUID id,
    UUID platilloId,
    String nombrePlatillo,
    Integer cantidad,
    BigDecimal precioUnitario,
    BigDecimal costoExtraUnitario
) {}