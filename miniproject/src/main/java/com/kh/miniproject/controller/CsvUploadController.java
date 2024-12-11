package com.kh.miniproject.controller;

import com.kh.miniproject.service.CsvUploadService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/csv")
public class CsvUploadController {

    private final CsvUploadService csvUploadService;

    // CSV 파일을 업로드하는 POST 요청
    @PostMapping("/upload")
    public ResponseEntity<String> uploadCsv(@RequestParam("file") MultipartFile file) {
        log.warn("파일 요청 {} ", file.getOriginalFilename());
        try {
            log.warn("scv 파일 전달전 {}",file.getOriginalFilename());
            csvUploadService.processCsv(file);
            log.warn("scv 파일 전달후 {}",file.getOriginalFilename());
            return ResponseEntity.ok("CSV 파일이 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 처리 중 오류가 발생했습니다.");
        }
    }
}
