package com.collegedirectory.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collegedirectory.dto.AuthenticationResponse;
import com.collegedirectory.dto.LoginRequest;
import com.collegedirectory.dto.SignUpRequest;
import com.collegedirectory.entities.User;
import com.collegedirectory.exception.EmailAlreadyExistsException;
import com.collegedirectory.exception.InvalidCredentialsException;
import com.collegedirectory.exception.UsernameAlreadyExistsException;
import com.collegedirectory.services.CustomUserDetailsService;
import com.collegedirectory.services.UserService;
import com.collegedirectory.util.JwtUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(), loginRequest.getPassword())
          
            );

            UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());

            String jwtToken = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthenticationResponse(jwtToken));

        } catch (BadCredentialsException e) {
           
        	  throw new InvalidCredentialsException("Invalid username or password.");
        }
    }
    
    
    @PostMapping("/signup")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequest signUpRequest) {
       
        if (userService.existsByUsername(signUpRequest.getUsername())) {
        	throw new UsernameAlreadyExistsException("Error: Username is already taken!");
        }

        if (userService.existsByEmail(signUpRequest.getEmail())) {
        	throw new EmailAlreadyExistsException("Error: Email is already in use!");
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPhone(signUpRequest.getPhone());
        user.setName(signUpRequest.getName());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword())); 
        user.setRole(signUpRequest.getRole());  

        userService.save(user);  

        return ResponseEntity.ok("User registered successfully!");
    }
}
