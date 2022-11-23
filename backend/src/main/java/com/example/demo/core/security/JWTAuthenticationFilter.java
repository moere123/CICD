package com.example.demo.core.security;

import com.example.demo.core.security.helpers.AuthorizationSchemas;
import com.example.demo.core.security.helpers.Credentials;
import com.example.demo.core.security.helpers.JwtProperties;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserDetailsImpl;
import com.example.demo.domain.user.dto.UserDTO;
import com.example.demo.domain.user.dto.UserMapper;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.io.IOException;
import java.util.Date;
import java.util.Map;
import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.RequestMatcher;

public class JWTAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

  private final UserMapper userMapper;
  private final JwtProperties jwtProperties;
  private static final Logger JWT_LOGGER = LoggerFactory.getLogger(JWTAuthenticationFilter.class);


  public JWTAuthenticationFilter(RequestMatcher requestMatcher, AuthenticationManager authenticationManager,
                                 JwtProperties jwtProperties, UserMapper userMapper) {
    super(requestMatcher, authenticationManager);
    this.jwtProperties = jwtProperties;
    this.userMapper = userMapper;
  }

  private String generateToken(Authentication authResult) {
    UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authResult.getPrincipal();
    byte[] keyBytes = Decoders.BASE64.decode(jwtProperties.getSecret());

    return Jwts.builder()
               .setClaims(Map.of("sub", userDetailsImpl.user()
                                                       .getId(), "authorities", userDetailsImpl.getAuthorities()))
               .setIssuedAt(new Date())
               .setExpiration(new Date(System.currentTimeMillis() + jwtProperties.getExpirationMillis()))
               .setIssuer(jwtProperties.getIssuer())
               .signWith(Keys.hmacShaKeyFor(keyBytes))
               .compact();
  }

  private String generateUserString(Authentication authResult) throws JsonProcessingException {
    UserDetailsImpl userDetailsImpl = (UserDetailsImpl) authResult.getPrincipal();
    User user = userDetailsImpl.getUser();

    UserDTO userDTO = userMapper.toDTO(user);

    return new ObjectMapper().writeValueAsString(userDTO);
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
      throws AuthenticationException {
    try {
      Credentials credentials = new ObjectMapper().readValue(request.getInputStream(), Credentials.class);
      return getAuthenticationManager().authenticate(
          new UsernamePasswordAuthenticationToken(credentials.getEmail(), credentials.getPassword()));
    }
    catch (IOException e) {
      JWT_LOGGER.error("Exception while Authentication thrown.", e);
      return null;
    }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                          Authentication authResult) throws IOException {
    response.addHeader(HttpHeaders.AUTHORIZATION, AuthorizationSchemas.BEARER + " " + generateToken(authResult));

    response.getWriter().write(generateUserString(authResult));
  }

  @Override
  protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                            AuthenticationException failed) {
    SecurityContextHolder.clearContext();
    response.setStatus(HttpStatus.UNAUTHORIZED.value());
  }
}
