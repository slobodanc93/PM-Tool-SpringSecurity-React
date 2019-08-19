package com.scvetkovic.pmtool.payload;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

public class LoginRequest {

    @NotBlank(message = "Username can not be blank")
    @Getter @Setter
    private String username;

    @NotBlank(message = "Password can not be blank")
    @Getter @Setter
    private String password;

}
