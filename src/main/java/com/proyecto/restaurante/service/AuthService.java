package com.proyecto.restaurante.service;

import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.proyecto.restaurante.dto.LoginRequestDto;
import com.proyecto.restaurante.dto.LoginResponseDto;
import com.proyecto.restaurante.dto.RegistroClienteDto;
import com.proyecto.restaurante.model.Usuario;
import com.proyecto.restaurante.model.enums.RolUsuario;
import com.proyecto.restaurante.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;

    public String registrarCliente(RegistroClienteDto dto) {
        if (usuarioRepository.findByCorreo(dto.getCorreo()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }

        String hash = passwordEncoder.encode(dto.getPassword());
        Usuario usuario = new Usuario();
        usuario.setCorreo(dto.getCorreo());
        usuario.setNombre(dto.getNombre());
        usuario.setHash_password(hash);
        usuario.setTelefono(dto.getTelefono());
        usuario.setFechadeNacimiento(dto.getFechaNacimiento());
        usuario.setRol(RolUsuario.CLIENTE);

        usuarioRepository.save(usuario);
        return "Cliente Registrado";
    }

    public LoginResponseDto login(LoginRequestDto dto) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(dto.getCorreo());
        if (usuarioOpt.isEmpty()) {
            throw new RuntimeException("Credenciales inválidas");
        }

        Usuario usuario = usuarioOpt.get();
        if (!passwordEncoder.matches(dto.getPassword(), usuario.getHash_password())) {
            throw new RuntimeException("Credenciales inválidas");
        }

        String token = jwtService.generarToken(usuario);

        return new LoginResponseDto(token, usuario.getNombre(), usuario.getId().toString());
    }

    public void logout(Usuario usuario) {
        int versionActual = usuario.getTokenVersion() == null ? 0 : usuario.getTokenVersion();
        usuario.setTokenVersion(versionActual + 1);
        usuarioRepository.save(usuario);
    }
}