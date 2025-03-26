package com.davvarmun.ultimategp.ultimategp.auth.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MessageResponse {

    private String message;

    public MessageResponse(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "MessageResponse [message=" + message + "]";
    }

}
