package com.scvetkovic.pmtool.services;

import com.scvetkovic.pmtool.domain.User;
import com.scvetkovic.pmtool.exceptions.UsernameAlreadyExistsException;
import com.scvetkovic.pmtool.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            //Username has to be unique (custom exception)
            //Make sure that password and password confirmation match
            //We don't persist or show the confirm password
            newUser.setConfirmPassword("Confirmed");
            return userRepository.save(newUser);
        } catch (Exception e) {
            throw new UsernameAlreadyExistsException("Username already exists, please log in.");
        }
    }

}
