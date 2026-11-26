package com.proyecto.restaurante.repository;

import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.proyecto.restaurante.model.DetallePedido;

public interface DetallePedidoRepository extends JpaRepository<DetallePedido, UUID> {
    List<DetallePedido> findByPedidoId(UUID pedidoId);
}