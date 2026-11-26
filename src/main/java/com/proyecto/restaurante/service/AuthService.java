package com.proyecto.restaurante.service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.proyecto.restaurante.dto.LoginRequestDto;
import com.proyecto.restaurante.dto.LoginResponseDto;
import com.proyecto.restaurante.dto.RegistroClienteDto;
import com.proyecto.restaurante.model.TokenRecuperacion;
import com.proyecto.restaurante.model.Usuario;
import com.proyecto.restaurante.model.enums.RolUsuario;
import com.proyecto.restaurante.repository.TokenRecuperacionRepository;
import com.proyecto.restaurante.repository.UsuarioRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final PasswordEncoder passwordEncoder;
    private final UsuarioRepository usuarioRepository;
    private final JwtService jwtService;
    private final TokenRecuperacionRepository tokenRecuperacionRepository;
    private final EmailService emailService;

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

    public void solicitarCodigoRecuperacion(String correo){
        Optional<Usuario> usuario = usuarioRepository.findByCorreo(correo);
        if (usuario.isEmpty()) {
            return;
        }
        
        LocalDateTime haceUnDia = LocalDateTime.now().minusHours(24);
        long intentosHoy = tokenRecuperacionRepository
                .countByUsuarioCorreoAndFechaExpiracionAfter(correo, haceUnDia);

        if (intentosHoy >= 3) {
            throw new RuntimeException("Has alcanzado el límite máximo de 3 solicitudes por día. Intenta mañana.");
        }

        tokenRecuperacionRepository.findByUsuarioCorreoAndUsadoFalse(correo)
                .ifPresent(tokenViejo -> {
                    tokenViejo.setUsado(true);
                    tokenRecuperacionRepository.save(tokenViejo);
                });

        String codigoLimpio = generarCodigoAlfanumerico();

        TokenRecuperacion tokenRecuperacion = new TokenRecuperacion();
        tokenRecuperacion.setUsuario(usuario.get());
        tokenRecuperacion.setCodigo(passwordEncoder.encode(codigoLimpio));
        tokenRecuperacion.setFechaExpiracion(LocalDateTime.now().plusMinutes(15));

        tokenRecuperacionRepository.save(tokenRecuperacion);
        emailService.enviarCorreoRecuperacion(usuario.get().getCorreo(), codigoLimpio);
    }

    private String generarCodigoAlfanumerico() {
        String caracteres = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
        SecureRandom random = new SecureRandom();
        StringBuilder codigo = new StringBuilder(6);
        
        for (int i = 0; i < 6; i++) {
            int indice = random.nextInt(caracteres.length());
            codigo.append(caracteres.charAt(indice));
        }
        return codigo.toString();
    }

    public String confirmarRecuperacion(String correo, String codigo) {
    Optional<TokenRecuperacion> tokenOpt = tokenRecuperacionRepository.findByUsuarioCorreoAndUsadoFalse(correo);
    if (tokenOpt.isEmpty()) {
        throw new RuntimeException("Código inválido o expirado");
    }

    TokenRecuperacion codigoR = tokenOpt.get();

    if (LocalDateTime.now().isAfter(codigoR.getFechaExpiracion())) {
        codigoR.setUsado(true);
        tokenRecuperacionRepository.save(codigoR);
        throw new RuntimeException("Código inválido o expirado");
    }

    if (codigo == null || !passwordEncoder.matches(codigo.toUpperCase(), codigoR.getCodigo())) {
        int nuevosIntentos = codigoR.getIntentosFallidos() + 1;
        codigoR.setIntentosFallidos(nuevosIntentos);

        if (nuevosIntentos >= 3) {
            codigoR.setUsado(true);
            tokenRecuperacionRepository.save(codigoR);
            throw new RuntimeException("Demasiados intentos fallidos. El código ha sido bloqueado.");
        }

        tokenRecuperacionRepository.save(codigoR);
        throw new RuntimeException("Código inválido. Te quedan " + (3 - nuevosIntentos) + " intentos.");
    }

    String resetToken = UUID.randomUUID().toString();
    codigoR.setResetToken(resetToken);
    codigoR.setFechaExpiracion(LocalDateTime.now().plusMinutes(10));
    tokenRecuperacionRepository.save(codigoR);

    return resetToken;
}

    public void restablecerPassword(String resetToken, String nuevaPassword) {
    TokenRecuperacion token = tokenRecuperacionRepository.findByResetTokenAndUsadoFalse(resetToken)
            .orElseThrow(() -> new RuntimeException("Sesión de recuperación inválida o expirada."));

    if (LocalDateTime.now().isAfter(token.getFechaExpiracion())) {
        token.setUsado(true);
        tokenRecuperacionRepository.save(token);
        throw new RuntimeException("El tiempo para cambiar la contraseña expiró.");
    }

    Usuario usuario = token.getUsuario();
    usuario.setHash_password(passwordEncoder.encode(nuevaPassword));
    
    int versionActual = usuario.getTokenVersion() == null ? 0 : usuario.getTokenVersion();
    usuario.setTokenVersion(versionActual + 1);
    usuarioRepository.save(usuario);
    token.setUsado(true);
    tokenRecuperacionRepository.save(token);
}
}