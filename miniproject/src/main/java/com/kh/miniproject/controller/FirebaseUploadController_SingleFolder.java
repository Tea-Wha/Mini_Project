package com.kh.miniproject.controller;

import com.kh.miniproject.service.FirebaseUploadService_SingleFolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
public class FirebaseUploadController_SingleFolder {

    @Autowired
    private FirebaseUploadService_SingleFolder firebaseUploadServiceSingleFolder;

    @GetMapping("/upload-images")
    public String uploadImages() {
        try {
            firebaseUploadServiceSingleFolder.uploadImagesFromFolder();
            return "Images uploaded successfully!";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to upload images: " + e.getMessage();
        }
    }
}