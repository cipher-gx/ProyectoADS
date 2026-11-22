package com.proyecto.restaurante.service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.proyecto.restaurante.model.Usuario;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    private SecretKey getSignInKey() {
        byte[] keyBytes = secretKey.getBytes(StandardCharsets.UTF_8);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generarToken(Usuario usuario) {
        long ahora = System.currentTimeMillis();
        int versionActual = usuario.getTokenVersion() == null ? 0 : usuario.getTokenVersion();

        return Jwts.builder()
                .subject(usuario.getCorreo())
                .claim("id", usuario.getId().toString())
                .claim("rol", usuario.getRol().name())
                .claim("version", versionActual)
                .issuedAt(new Date(ahora))
                .expiration(new Date(ahora + jwtExpiration))
                .signWith(getSignInKey())
                .compact();
    }

    public String extractCorreo(String token) {
        return getClaims(token).getSubject();
    }

    public String extractRol(String token) {
        return getClaims(token).get("rol", String.class);
    }

    public Integer extractTokenVersion(String token) {
        return getClaims(token).get("version", Integer.class);
    }

    public boolean isTokenValid(String token, Usuario usuario) {
        final String tokenCorreo = extractCorreo(token);
        final Integer tokenVersion = extractTokenVersion(token);
        int versionUsuarioEnBd = usuario.getTokenVersion() == null ? 0 : usuario.getTokenVersion();

        return (tokenCorreo.equals(usuario.getCorreo()))
                && (tokenVersion != null && tokenVersion.equals(versionUsuarioEnBd))
                && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    private Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}