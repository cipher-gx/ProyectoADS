package com.proyecto.restaurante.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.restaurante.dto.ModificarPedidoDto;
import com.proyecto.restaurante.dto.PagoRequestDto;
import com.proyecto.restaurante.dto.PedidoRequestDto;
import com.proyecto.restaurante.dto.PedidoResponseDto;
import com.proyecto.restaurante.model.Pedido;
import com.proyecto.restaurante.model.Usuario;
import com.proyecto.restaurante.service.PedidoService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoRestController {

    private final PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<PedidoResponseDto> crearPedido(
            @Valid @RequestBody PedidoRequestDto dto,
            @AuthenticationPrincipal Usuario usuario) {
        Pedido pedido = pedidoService.crearPedido(dto, usuario);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(pedidoService.mapearAResponse(pedido));
    }

    @GetMapping("/kds")
    public ResponseEntity<List<PedidoResponseDto>> obtenerTableroKds() {
        List<PedidoResponseDto> kds = pedidoService.obtenerTableroKds()
                .stream()
                .map(pedidoService::mapearAResponse)
                .toList();
        return ResponseEntity.ok(kds);
    }

    @PatchMapping("/{pedidoId}/aceptar")
    public ResponseEntity<PedidoResponseDto> aceptarPedido(
            @PathVariable UUID pedidoId,
            @AuthenticationPrincipal Usuario chef) {
        return ResponseEntity.ok(
                pedidoService.mapearAResponse(pedidoService.aceptarPedido(pedidoId, chef))
        );
    }

    @PatchMapping("/{pedidoId}/listo")
    public ResponseEntity<PedidoResponseDto> marcarListo(@PathVariable UUID pedidoId) {
        return ResponseEntity.ok(
                pedidoService.mapearAResponse(pedidoService.marcarListo(pedidoId))
        );
    }

    @PutMapping("/{pedidoId}")
    public ResponseEntity<PedidoResponseDto> modificarPedido(
            @PathVariable UUID pedidoId,
            @Valid @RequestBody ModificarPedidoDto dto,
            @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(
                pedidoService.mapearAResponse(pedidoService.modificarPedido(pedidoId, dto, usuario))
        );
    }

    @PatchMapping("/{pedidoId}/cancelar")
    public ResponseEntity<PedidoResponseDto> cancelarPedido(
            @PathVariable UUID pedidoId,
            @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(
                pedidoService.mapearAResponse(pedidoService.cancelarPedido(pedidoId, usuario))
        );
    }

    @PostMapping("/{pedidoId}/cupones")
    public ResponseEntity<PedidoResponseDto> aplicarCupones(
            @PathVariable UUID pedidoId,
            @RequestBody List<String> codigos,
            @AuthenticationPrincipal Usuario usuario) {
        return ResponseEntity.ok(
                pedidoService.mapearAResponse(pedidoService.aplicarCupones(pedidoId, codigos, usuario))
        );
    }

    @PostMapping("/{pedidoId}/pagar")
    public ResponseEntity<PedidoResponseDto> procesarPago(
            @PathVariable UUID pedidoId,
            @Valid @RequestBody PagoRequestDto dto) {
        return ResponseEntity.ok(
                pedidoService.mapearAResponse(pedidoService.procesarPago(pedidoId, dto))
        );
    }
}