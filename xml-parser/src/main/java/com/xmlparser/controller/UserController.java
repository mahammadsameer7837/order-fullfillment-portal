package com.xmlparser.controller;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.xmlparser.entity.Users;
import com.xmlparser.payload.request.SignupRequest;
import com.xmlparser.payload.response.UserInfoResponse;
import com.xmlparser.security.jwt.JwtUtils;
import com.xmlparser.security.services.UserDetailsImpl;
import com.xmlparser.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserService userService;
	
	 @Autowired
	 JwtUtils jwtUtils;
	
	@GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable("email") String email) {
        Users users = userService.getUser(email);
        return ResponseEntity.status(HttpStatus.OK).body(users);
    }
	
	@PutMapping("/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable("userId") long userId, @RequestBody SignupRequest request) {
        Users users = userService.updateUser(userId, request);
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(users.getEmail(), users.getPassword()));

            SecurityContextHolder.getContext().setAuthentication(authentication);

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

            String jwtToken = jwtUtils.generateJwtCookie(userDetails);
            return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, jwtToken.toString())
                .body(new UserInfoResponse(userDetails.getId(),
                                           userDetails.getFirstName(),userDetails.getLastName(),
                                           userDetails.getEmail(), jwtToken));
        //return ResponseEntity.status(HttpStatus.OK).body(users);
    }

}
