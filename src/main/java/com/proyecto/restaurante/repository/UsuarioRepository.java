package com.proyecto.restaurante.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.restaurante.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, UUID> {

    Optional<Usuario> findByCorreo(String correo);

    boolean existsByCorreo(String correo);
}