package com.kh.miniproject.controller;

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
@RequestMapping("/customise")
public class CustomiseController {
    private final CustomiseService customiseService;

    @GetMapping("/spec")
    public ResponseEntity<List<CarVo>> getCarDetail() {
        List<CarVo> loadedCarDetail = customiseService.getCarInfo();
        return ResponseEntity.ok(loadedCarDetail);
    }

    @GetMapping("/color")
    public ResponseEntity<List<ColorVo>> getColorDetail() {
        List<ColorVo> loadedColorDetail = customiseService.getColorInfo();
        return ResponseEntity.ok(loadedColorDetail);
    }

    @GetMapping("/option")
    public ResponseEntity<List<FeatureVo>> getFeatureDetail() {
        List<FeatureVo> loadedFeatureDetail = customiseService.getFeatureInfo();
        return ResponseEntity.ok(loadedFeatureDetail);
    }
}
