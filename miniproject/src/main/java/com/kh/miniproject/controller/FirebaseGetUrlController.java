package com.kh.miniproject.controller;

import com.kh.miniproject.service.FirebaseGetUrlService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
public class FirebaseGetUrlController {

    private final FirebaseGetUrlService firebaseGetUrlService;

    public FirebaseGetUrlController(FirebaseGetUrlService firebaseGetUrlService) {
        this.firebaseGetUrlService = firebaseGetUrlService;
    }
    
    // 컬러칩
    @GetMapping("/api/images/fullurls") // Custom 상황 (전체 URL 받아오기) (Ex - 로고 이미지 URL)
    public List<String> getAllImageUrls() throws IOException {
        return firebaseGetUrlService.getImageFullUrls();
    }

    @GetMapping("/api/images/shorturls") // Custom 상황 (축약 URL 받아오기) (Ex - 차 대표 / 상세 이미지, 컬러칩)
    public List<String> getShortImageUrls() throws IOException {
        return firebaseGetUrlService.getImageShortUrls();
    }
    
    // 컬러 받아오기
    @GetMapping("/api/images/fullcolorurls/distribution") // Custom 상황 (전체 URL 받아오기) (다중 경로)
    public List<List<String>> getAllColorImageUrlsDistribution() throws IOException {
        return firebaseGetUrlService.getImageFullColorUrlsDistribution();
    }
    
    // 대표 이미지 받아오기
    @GetMapping("/api/images/shortrepurls/distribution") // Custom 상황 (전체 URL 받아오기) (다중 경로)
    public List<List<String>> getShortRepImageUrlsDistribution() throws IOException {
        return firebaseGetUrlService.getImageShortRepUrlsDistribution();
    }

    // 대표 이미지 받아오기
    @GetMapping("/api/images/shortrepfolderurls/distribution") // Custom 상황 (전체 URL 받아오기) (다중 경로)
    public List<List<List<String>>> getShortRepFolderImageUrlsDistribution() throws IOException {
        return firebaseGetUrlService.getImageShortRepFolderUrlsDistribution();
    }

    @GetMapping("/api/images/shorturls/distribution") // Custom 상황 (전체 URL 받아오기) (단일 경로)
    public List<List<String>> getShortImageUrlsDistribution() throws IOException {
        return firebaseGetUrlService.getImageShortUrlsDistribution();
    }
    
    // 컬러 이름 받아오기
    @GetMapping("/api/images/names/distribution") // Custom 상황 (전체 URL 받아오기) (다중 경로)
    public List<List<String>> getShortImageNamesDistribution() throws IOException {
        return firebaseGetUrlService.getImageColorNamesDistribution();
    }
}
