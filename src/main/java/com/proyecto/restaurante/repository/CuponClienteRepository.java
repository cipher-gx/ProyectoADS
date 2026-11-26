package com.proyecto.restaurante.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.proyecto.restaurante.model.CuponCliente;

public interface CuponClienteRepository extends JpaRepository<CuponCliente, UUID> {
    Optional<CuponCliente> findByCodigoAndUsadoFalseAndActivoTrue(String codigo);
}