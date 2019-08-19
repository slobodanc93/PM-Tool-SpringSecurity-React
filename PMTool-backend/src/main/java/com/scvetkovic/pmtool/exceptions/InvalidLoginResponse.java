package com.scvetkovic.pmtool.exceptions;

public class InvalidLoginResponse {
    private String invalidUsernameOrPassword;

    public InvalidLoginResponse() {
        this.invalidUsernameOrPassword = "Invalid username or password";
    }

    public String getInvalidUsernameOrPassword() {
        return invalidUsernameOrPassword;
    }

    public void setInvalidUsernameOrPassword(String invalidUsernameOrPassword) {
        this.invalidUsernameOrPassword = invalidUsernameOrPassword;
    }
}
