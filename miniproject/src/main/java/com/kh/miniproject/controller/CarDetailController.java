package com.kh.miniproject.controller;

import com.kh.miniproject.service.CarDetailService;
import com.kh.miniproject.vo.CarVo;
import com.kh.miniproject.vo.ColorVo;
import com.kh.miniproject.vo.FeatureVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/detail")
public class CarDetailController {
    private final CarDetailService carDetailService;

    @GetMapping("/spec/{carNo}")
    public ResponseEntity<CarVo> getCarDetail(@PathVariable("carNo") int carNo) {
        CarVo loadedCarDetail = carDetailService.getCarInfo(carNo);
        return ResponseEntity.ok(loadedCarDetail);
    }

    @GetMapping("/color/{carNo}")
    public ResponseEntity<List<ColorVo>> getColorDetail(@PathVariable("carNo") int carNo) {
        List<ColorVo> loadedColorDetail = carDetailService.getColorInfo(carNo);
        return ResponseEntity.ok(loadedColorDetail);
    }

    @GetMapping("/option/{carNo}")
    public ResponseEntity<List<FeatureVo>> getFeatureDetail(@PathVariable("carNo") int carNo) {
        List<FeatureVo> loadedFeatureDetail = carDetailService.getFeatureInfo(carNo);
        return ResponseEntity.ok(loadedFeatureDetail);
    }
}
