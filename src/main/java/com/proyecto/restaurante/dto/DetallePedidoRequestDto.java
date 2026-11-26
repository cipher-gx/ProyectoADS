package com.proyecto.restaurante.dto;

import java.util.UUID;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 
public class DetallePedidoRequestDto {
    @NotNull(message = "El platillo es obligatorio")
    private UUID platilloId;

    @NotNull 
    @Min (value = 1, message = "La cantidad mínima es 1")
    private Integer cantidad;
}