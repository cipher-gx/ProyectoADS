package com.proyecto.restaurante.dto;

import java.util.List;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class ModificarPedidoDto {

    @NotEmpty(message = "El pedido debe tener al menos un platillo")
    @Valid
    private List<DetallePedidoRequestDto> detalles;

    private UUID direccionId;
}