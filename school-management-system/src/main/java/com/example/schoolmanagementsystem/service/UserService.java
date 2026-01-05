package com.example.schoolmanagementsystem.service;

import com.example.schoolmanagementsystem.model.User;
import com.example.schoolmanagementsystem.web.dto.UserRegistrationDto;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    User save(UserRegistrationDto registrationDto);
}
