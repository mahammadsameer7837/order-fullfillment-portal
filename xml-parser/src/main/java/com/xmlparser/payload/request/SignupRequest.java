package com.xmlparser.payload.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.Data;

@Data
public class SignupRequest {
  @NotBlank
  @Size(min = 3, max = 20, message = "FirstName size must be between 3 and 20")
  private String firstName;
  
  @NotBlank
  private String lastName;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(min = 3, max = 40, message = "Password size must be between 3 and 40")
  private String password;
}
