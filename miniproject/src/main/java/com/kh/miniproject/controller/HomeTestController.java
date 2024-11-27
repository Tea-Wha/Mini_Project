package com.kh.miniproject.controller;



import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/login")
public class HomeTestController {
    @PostMapping("/navigate")
    public Map<String, String> loginNavigation () {
        Map<String, String> response = new HashMap<>();
        response.put("redirectUrl", "/loginpage");
        return response;
    }

}
