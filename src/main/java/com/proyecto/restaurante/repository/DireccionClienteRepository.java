package com.proyecto.restaurante.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.proyecto.restaurante.model.DireccionCliente;

public interface DireccionClienteRepository extends JpaRepository<DireccionCliente, UUID> {
}