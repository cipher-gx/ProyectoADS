package com.proyecto.restaurante.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.proyecto.restaurante.model.Mesa;

public interface MesaRepository extends JpaRepository<Mesa, UUID> {
}