package com.kh.miniproject.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/test")
    public String testApi(){
        System.out.println("React에서 요청을 받았습니다!");
        return "Thank You Spring Boot!";
    }
}
