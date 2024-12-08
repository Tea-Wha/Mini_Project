package com.kh.miniproject.controller;

import com.kh.miniproject.service.FirebaseUploadService_MultiFolder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
public class FirebaseUploadController_MultiFolder {

    @Autowired
    private final FirebaseUploadService_MultiFolder uploadServiceTest;

    public FirebaseUploadController_MultiFolder(FirebaseUploadService_MultiFolder uploadServiceTest){
        this.uploadServiceTest = uploadServiceTest;
    }
    
    @GetMapping("/upload-multiple-folders")
    public String uploadMultipleFolders() throws IOException {
        // 로컬 최상위 폴더 및 Firebase 기준 경로 설정
        String localRootPath = "src/main/resources/IMAGE";
        String firebaseRootPath = "IMAGE/";

        // 대량 이미지 업로드 실행
        uploadServiceTest.uploadAllFolders(localRootPath, firebaseRootPath);

        return "모든 폴더 업로드 완료";
    }
}
