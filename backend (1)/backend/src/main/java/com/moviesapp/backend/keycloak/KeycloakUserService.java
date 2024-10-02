package com.moviesapp.backend.keycloak;

import org.keycloak.KeycloakPrincipal;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

import static reactor.core.publisher.Mono.just;

@Service
public class KeycloakUserService {
    @Value(("${keycloak.auth-server-url}"))
    private String keycloakServerUrl;

    @Value("${keycloak.realm}")
    private String keycloakRealm;

    @Value("${keycloak.resource}")
    private String keycloakClientId;

    @Value("${keycloak.credentials.secret}")
    private String clientSecret;

    @Value("${keycloak-admin.username}")
    private String keycloakAdminUsername;

    @Value("${keycloak-admin.password}")
    private String keycloakAdminPassword;

    @Autowired
    private WebClient.Builder webClientBuilder;
    private String keycloakToken;

    public Mono<Void> createUserInKeycloak(UserRepresentation user){
        return getKeycloakToken()
                .flatMap(token -> webClientBuilder.build()
                        .post()
                        .uri(keycloakServerUrl + "/admin/realms/" + keycloakRealm + "/users")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer "+ token)
                        .body(Mono.just(user), UserRepresentation.class)
                        .retrieve()
                        .bodyToMono(Void.class));
    }

    public Mono<String> loginUser(String username, String password) {
        return webClientBuilder.build()
                .post()
                .uri(keycloakServerUrl + "/realms/" + keycloakRealm + "/protocol/openid-connect/token")
                .header(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded")
                .bodyValue("client_id=" + keycloakClientId +
                        "&client_secret=" + clientSecret +
                        "&username=" + username +
                        "&password=" + password +
                        "&grant_type=password")
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> (String) response.get("access_token"))
                .onErrorResume(e -> {
                    // Handle error (e.g., return a default value or log the error)
                    return Mono.error(new RuntimeException("Login failed: " + e.getMessage()));
                });
    }

    public Mono<Void> logoutUser(String refreshToken){
        String logoutUrl = keycloakServerUrl + "/realms" + keycloakRealm + "/protocol/openid-connect/logout";
        return webClientBuilder.build()
                .post()
                .uri(logoutUrl)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .bodyValue("client_id=" +keycloakClientId +
                        "&client_secret=" +clientSecret +
                        "&refresh_token=" +refreshToken)
                .retrieve()
                .bodyToMono(Void.class)
                .onErrorResume(e -> {
                    return Mono.error(new RuntimeException("Logot failed: "+ e.getMessage()));
                });
    }

    private Mono<String> getKeycloakToken() {
        if(keycloakToken != null){
            return Mono.just(keycloakToken);
        }
        return webClientBuilder.build()
                .post()
                .uri(keycloakServerUrl + "/realms/" + keycloakRealm + "/protocol/openid-connect/token")
                .header(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded")
                .bodyValue("client_id=" + keycloakClientId +
                        "&client_secret=" +clientSecret+
                        "&username=" + keycloakAdminUsername +
                        "&password=" + keycloakAdminPassword +
                        "&grant_type=password")
                .retrieve()
                .bodyToMono(Map.class)
                .map(response -> (String) response.get("access_token"))
                .doOnNext(token -> this.keycloakToken = token); // Cache the token
    }

    public Mono<String> getCurrentUserId() {
        return ReactiveSecurityContextHolder.getContext()
                .map(securityContext -> {
                    String userId = "Unknown";
                    if (securityContext.getAuthentication() instanceof JwtAuthenticationToken) {
                        JwtAuthenticationToken jwtAuth = (JwtAuthenticationToken) securityContext.getAuthentication();
                        userId = jwtAuth.getToken().getClaimAsString("sub");
                    }
                    return userId;
                });
    }
}
