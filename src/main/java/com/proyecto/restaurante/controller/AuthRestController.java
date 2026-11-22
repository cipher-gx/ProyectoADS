package com.proyecto.restaurante.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proyecto.restaurante.dto.LoginRequestDto;
import com.proyecto.restaurante.dto.LoginResponseDto;
import com.proyecto.restaurante.dto.RegistroClienteDto;
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

}