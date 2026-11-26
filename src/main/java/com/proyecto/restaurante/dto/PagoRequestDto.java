package com.proyecto.restaurante.dto;

import java.math.BigDecimal;

import com.proyecto.restaurante.model.enums.MetodoPago;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data 
public class PagoRequestDto {
    @NotNull (message = "El método de pago es obligatorio")
    private MetodoPago metodoPago;

    @DecimalMin (value = "0.0", message = "La propina no puede ser negativa")
    private BigDecimal propinaRepartidor = BigDecimal.ZERO;

    private Boolean solicitaFactura = false;

    // Obligatorio en el Service solo si solicitaFactura == true
    private String rfcFacturacion;
}
