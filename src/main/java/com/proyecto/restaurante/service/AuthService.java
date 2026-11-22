package com.proyecto.restaurante.service;

import java.time.LocalDateTime;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.proyecto.restaurante.model.Usuario;
import com.proyecto.restaurante.repository.UsuarioRepository;
import com.proyecto.restaurante.dto.RegistroClienteDto;

import lombok.AllArgsConstructor;

@Service 
@AllArgsConstructor 
public class AuthService {

    private PasswordEncoder passwordEncoder;
    private UsuarioRepository usuarioRepository;

    public ResponseEntity<String> registrarCliente(RegistroClienteDto dto){

    if(usuarioRepository.findByCorreo(dto.getCorreo()).isPresent()){
            throw new RuntimeException("El correo ya esta registrado");
        }
        String hash = passwordEncoder.encode(dto.getPassword());
        Usuario usuario = new Usuario();
        usuario.setCorreo(dto.getCorreo());
        usuario.setNombre(dto.getNombre());
        usuario.setHash_password(hash);

        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Cliente Registrado");
    }
}
