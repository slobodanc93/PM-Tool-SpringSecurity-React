package com.scvetkovic.pmtool.web;

import com.scvetkovic.pmtool.domain.User;
import com.scvetkovic.pmtool.payload.JWTLoginSuccessRespone;
import com.scvetkovic.pmtool.payload.LoginRequest;
import com.scvetkovic.pmtool.security.JwtTokenProvider;
import com.scvetkovic.pmtool.services.MapValidationErrorService;
import com.scvetkovic.pmtool.services.UserService;
import com.scvetkovic.pmtool.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.scvetkovic.pmtool.security.SecurityConstants.TOKEN_PREFIX;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody User user,
            BindingResult result) {
        //Validate that password match
        userValidator.validate(user, result);
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidation(result);
        if(errorMap != null)
            return errorMap;

        User newUser = userService.saveUser(user);
        return new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(
            @Valid @RequestBody LoginRequest loginRequest,
            BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidation(result);
        if(errorMap != null)
            return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + jwtTokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSuccessRespone(true, jwt));
    }

}
