/* 리액트에서 파일 첨부시 요청을 받는 컨트롤러
*  하나의 컨트롤러로 처리를 하는게 아닌 각자 다른 루트로 전달받은 파일 예) 차량 CSV, 색상 CSV, 옵션 CSV 를 각자
*  처리를 해줌 리액트와 3:3 구조 */
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

    // 자동차 CSV 파일을 업로드하는 POST 매핑
    @PostMapping("/uploadCar")
    public ResponseEntity<String> uploadCarCsv(@RequestParam("file") MultipartFile file) {
        log.warn("차량 파일 요청 {} ", file.getOriginalFilename());
        try {
            log.warn("차량 scv 파일 전달전 {}",file.getOriginalFilename());
            csvUploadService.processCarCsv(file);
            log.warn("차량 scv 파일 전달후 {}",file.getOriginalFilename());
            return ResponseEntity.ok("차량 CSV 파일이 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 처리 중 오류가 발생했습니다.");
        }
    }

    // 색상 CSV 파일을 업로드하는 POST 매핑
    @PostMapping("/uploadColor")
    public ResponseEntity<String> uploadColorCsv(@RequestParam("file") MultipartFile file) {
        log.warn("색상 파일 요청 {} ", file.getOriginalFilename());
        try {
            log.warn("색상 scv 파일 전달전 {}",file.getOriginalFilename());
            csvUploadService.processColorCsv(file);
            log.warn("색상 scv 파일 전달후 {}",file.getOriginalFilename());
            return ResponseEntity.ok("색상 CSV 파일이 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 처리 중 오류가 발생했습니다.");
        }
    }

    // 옵션 CSV 파일을 업로드하는 POST 매핑
    @PostMapping("/uploadFeature")
    public ResponseEntity<String> uploadFeatureCsv(@RequestParam("file") MultipartFile file) {
        log.warn("옵션 파일 요청 {} ", file.getOriginalFilename());
        try {
            log.warn("옵션 scv 파일 전달전 {}",file.getOriginalFilename());
            csvUploadService.processFeatureCsv(file);
            log.warn("옵션 scv 파일 전달후 {}",file.getOriginalFilename());
            return ResponseEntity.ok("옵션 CSV 파일이 성공적으로 처리되었습니다.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 처리 중 오류가 발생했습니다.");
        }
    }
}
