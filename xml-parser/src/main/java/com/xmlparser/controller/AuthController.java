package com.xmlparser.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xmlparser.entity.Users;
import com.xmlparser.exception.AppointmentBookingException;
import com.xmlparser.payload.request.LoginRequest;
import com.xmlparser.payload.request.SignupRequest;
import com.xmlparser.payload.response.MessageResponse;
import com.xmlparser.payload.response.UserInfoResponse;
import com.xmlparser.repository.UserRepository;
import com.xmlparser.security.jwt.JwtUtils;
import com.xmlparser.security.services.UserDetailsImpl;
import com.xmlparser.security.services.UserDetailsServiceImpl;
import com.xmlparser.service.UserService;




@CrossOrigin
@RestController
@RequestMapping("/api/auth")
public class AuthController {
  @Autowired
  AuthenticationManager authenticationManager;

  @Autowired
  UserRepository userRepository;
  
  @Autowired
  UserService userService;

  @Autowired
  JwtUtils jwtUtils;
  
  @Autowired
  UserDetailsServiceImpl userDetailsServiceImpl;

  @PostMapping("/signin")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);

    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

    String jwtToken = jwtUtils.generateJwtCookie(userDetails);
    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtToken.toString())
        .body(new UserInfoResponse(userDetails.getId(),
                                   userDetails.getFirstName(),userDetails.getLastName(),
                                   userDetails.getEmail(), jwtToken));
  }

  @PostMapping("/signup")
  public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
    if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
      throw new AppointmentBookingException("Email already taken!!");
    }
    // Create new user's account
    Users user = new Users(signUpRequest.getFirstName(), signUpRequest.getLastName(), 
                         signUpRequest.getEmail(),
                         signUpRequest.getPassword());

    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
  
  @PostMapping("/reset-password")
  public ResponseEntity<?> registerUser(@Valid @RequestBody LoginRequest forgotPasswordRequest) {
	  Optional<Users> findByEmail = userRepository.findByEmail(forgotPasswordRequest.getEmail());
    if (!findByEmail.isPresent()) {
      throw new AppointmentBookingException("Email not found!!");
    }
    
    // Create new user's account
    Users user = findByEmail.get();
    user.setPassword(forgotPasswordRequest.getPassword());
    userRepository.save(user);

    return ResponseEntity.ok(new MessageResponse("Password reset successfully!"));
  }
  
  @GetMapping("/exists/{userId}")
  public ResponseEntity<?> isUserExist(@PathVariable("userId") long userId) {
      boolean isExist = userService.getUserExists(userId);
      return ResponseEntity.status(HttpStatus.OK).body(isExist);
  }
}
