package com.proyecto.restaurante.repository;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.restaurante.model.TokenRecuperacion;

public interface TokenRecuperacionRepository extends JpaRepository<TokenRecuperacion, UUID>{
    Optional<TokenRecuperacion> findByUsuarioCorreoAndUsadoFalse(String correo);
    long countByUsuarioCorreoAndFechaExpiracionAfter(String correo, LocalDateTime fechaLimite);

    Optional<TokenRecuperacion> findByResetTokenAndUsadoFalse(String resetToken);
}
