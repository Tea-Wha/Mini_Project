package com.kh.miniproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirebaseTestController {

    @GetMapping("/test-firebase")
    public String testFirebaseConnection() {
        return "Firebase is configured correctly!";
    }
}