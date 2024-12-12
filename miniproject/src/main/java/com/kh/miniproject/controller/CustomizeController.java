package com.kh.miniproject.controller;

import com.kh.miniproject.service.CustomizeService;
import com.kh.miniproject.vo.CarVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/customize")
public class CustomizeController {
    private final CustomizeService customizeService;

    @GetMapping("/spec/{carNo}")
    public ResponseEntity<CarVo> getCarDetail(@PathVariable("carNo") int carNo) {
        CarVo loadedCarDetail = customizeService.getCarInfo(carNo);
        return ResponseEntity.ok(loadedCarDetail);
    }
    
}
