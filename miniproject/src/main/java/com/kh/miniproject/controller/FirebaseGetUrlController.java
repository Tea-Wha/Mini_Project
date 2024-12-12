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

    @GetMapping("/api/images/fullurls") // Custom 상황 (전체 URL 받아오기) (Ex - 로고 이미지 URL)
    public List<String> getAllImageUrls() throws IOException {
        return firebaseGetUrlService.getImageFullUrls();
    }

    @GetMapping("/api/images/shorturls") // Custom 상황 (축약 URL 받아오기) (Ex - 차 대표 / 상세 이미지, 컬러칩)
    public List<String> getShortImageUrls() throws IOException {
        return firebaseGetUrlService.getImageShortUrls();
    }
}
