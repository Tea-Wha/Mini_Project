package com.kh.miniproject.controller;

import com.kh.miniproject.service.CarService;
import com.kh.miniproject.vo.CarVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/carList")
public class CarController {
    private final CarService carService;

    @GetMapping("/detail")
    public ResponseEntity<List<CarVo>> getCarDetail() {
        List<CarVo> loadedCarDetail = carService.getCarInfo();
        return ResponseEntity.ok(loadedCarDetail);
    }
}
