package com.proyecto.restaurante.dto;

import java.util.List;
import java.util.UUID;

import com.proyecto.restaurante.model.enums.TipoPedido;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 
public class PedidoRequestDto {
    @NotNull (message = "El tipo de pedido es obligatorio")
    private TipoPedido tipoPedido; // Ej. DOMICILIO, MESA, PARA_LLEVAR

    // Opcional: solo si el pedido es en el restaurante
    private UUID mesaId;

    // Opcional: solo si es a domicilio (para calcular envío y ruta)
    private UUID direccionId;

    @NotEmpty (message = "El pedido debe tener al menos un platillo")
    @Valid 
    private List<DetallePedidoRequestDto> detalles;
}