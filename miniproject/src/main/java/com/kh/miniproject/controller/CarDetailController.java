package com.kh.miniproject.controller;

import com.kh.miniproject.service.CarDetailService;
import com.kh.miniproject.service.CustomiseService;
import com.kh.miniproject.vo.CarVo;
import com.kh.miniproject.vo.ColorVo;
import com.kh.miniproject.vo.FeatureVo;
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
@RequestMapping("/detail")
public class CarDetailController {
    private final CarDetailService carDetailService;

    @GetMapping("/spec")
    public ResponseEntity<List<CarVo>> getCarDetail() {
        List<CarVo> loadedCarDetail = carDetailService.getCarInfo();
        return ResponseEntity.ok(loadedCarDetail);
    }

    @GetMapping("/color")
    public ResponseEntity<List<ColorVo>> getColorDetail() {
        List<ColorVo> loadedColorDetail = carDetailService.getColorInfo();
        return ResponseEntity.ok(loadedColorDetail);
    }

    @GetMapping("/option")
    public ResponseEntity<List<FeatureVo>> getFeatureDetail() {
        List<FeatureVo> loadedFeatureDetail = carDetailService.getFeatureInfo();
        return ResponseEntity.ok(loadedFeatureDetail);
    }
}
