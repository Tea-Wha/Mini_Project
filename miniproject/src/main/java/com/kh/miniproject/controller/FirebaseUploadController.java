package com.kh.miniproject.controller;

import com.kh.miniproject.service.FirebaseUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class FirebaseUploadController {

    @Autowired
    private FirebaseUploadService firebaseUploadService;

    @GetMapping("/upload-images")
    public String uploadImages() {
        try {
            firebaseUploadService.uploadImagesFromFolder();
            return "Images uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload images: " + e.getMessage();
        }
    }
}