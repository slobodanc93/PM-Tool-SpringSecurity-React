package com.scvetkovic.pmtool.exceptions;

public class UsernameAlreadyExistsExceptionResponse {

    String username;

    public UsernameAlreadyExistsExceptionResponse(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
