package com.scvetkovic.pmtool.payload;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
public class JWTLoginSuccessRespone {

    @Getter @Setter
    private boolean success;

    @Getter @Setter
    private String token;


    @Override
    public String toString() {
        return "JWTLoginSuccessRespone{" +
                "success=" + success +
                ", token='" + token + '\'' +
                '}';
    }
}
