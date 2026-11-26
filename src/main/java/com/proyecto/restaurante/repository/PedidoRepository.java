package com.proyecto.restaurante.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.restaurante.model.Pedido;
import com.proyecto.restaurante.model.enums.EstadoPedido;

public interface PedidoRepository extends JpaRepository<Pedido, UUID> {
    List<Pedido> findByEstadoInOrderByCreadoEnAsc(List<EstadoPedido> estados);
    List<Pedido> findByClienteIdOrderByCreadoEnDesc(UUID clienteId);
}