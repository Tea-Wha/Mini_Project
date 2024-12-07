package com.kh.miniproject.controller;

import com.kh.miniproject.service.FirebaseGetUrlService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
public class FirebaseGetUrlController {

    private final FirebaseGetUrlService firebaseGetUrlService;

    public FirebaseGetUrlController(FirebaseGetUrlService firebaseGetUrlService) {
        this.firebaseGetUrlService = firebaseGetUrlService;
    }

    @GetMapping("/api/images/urls")
    public List<String> getAllImageUrls() throws IOException {
        return firebaseGetUrlService.getImageUrls();
    }
}
