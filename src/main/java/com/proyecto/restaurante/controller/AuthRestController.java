package com.proyecto.restaurante.controller;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.restaurante.dto.LoginRequestDto;
import com.proyecto.restaurante.dto.LoginResponseDto;
import com.proyecto.restaurante.dto.RegistroClienteDto;
import com.proyecto.restaurante.dto.RestablecerPasswordDto;
import com.proyecto.restaurante.dto.ValidarCodigoDto;
import com.proyecto.restaurante.model.Usuario;
import com.proyecto.restaurante.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthRestController {

    private final AuthService authService;

    @PostMapping("/registro")
    public ResponseEntity<String> registrarCliente(@Valid @RequestBody RegistroClienteDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(authService.registrarCliente(dto));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@Valid @RequestBody LoginRequestDto dto) {
        return ResponseEntity.ok(authService.login(dto));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@AuthenticationPrincipal Usuario usuario) {
        if (usuario == null) {
            throw new RuntimeException("No hay una sesión activa");
        }
        authService.logout(usuario);
        return ResponseEntity.ok("Sesión cerrada correctamente.");
    }

    @PostMapping("/recuperar")
    public ResponseEntity<String> solicitarRecuperacion(@RequestParam String email) {
        authService.solicitarCodigoRecuperacion(email);
        return ResponseEntity.ok("Si el correo está registrado, recibirás un código de recuperación.");
    }

    @PostMapping("/validar-codigo")
    public ResponseEntity<Map<String, String>> confirmarRecuperacion(@Valid @RequestBody ValidarCodigoDto dto) {
        String resetToken = authService.confirmarRecuperacion(dto.getCorreo(), dto.getCodigo());
        return ResponseEntity.ok(Map.of("resetToken", resetToken));
    }

    @PostMapping("/restablecer-password")
    public ResponseEntity<String> restablecerPassword(@Valid @RequestBody RestablecerPasswordDto dto) {
        authService.restablecerPassword(dto.getResetToken(), dto.getNuevaPassword());
        return ResponseEntity.ok("Contraseña actualizada correctamente.");
    }
    
}