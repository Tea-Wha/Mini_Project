package com.kh.miniproject.controller;

import com.kh.miniproject.service.SortService;
import com.kh.miniproject.vo.ClassificationVo;
import com.kh.miniproject.vo.EngineVo;
import com.kh.miniproject.vo.ManufacturerVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/carList")
@RequiredArgsConstructor
public class SortController {
    private final SortService sortService;

    @GetMapping("/companies")
    public ResponseEntity<List<ManufacturerVo>> getSortedManufacturer() {
        List<ManufacturerVo> manufacturers = sortService.getManufacturer();
        return ResponseEntity.ok(manufacturers);
    }

    @GetMapping("/engines")
    public ResponseEntity<List<EngineVo>> getSortedEngine() {
        List<EngineVo> engines = sortService.getEngines();
        return ResponseEntity.ok(engines);
    }

    @GetMapping("/maxPrice")
    public ResponseEntity<Integer> getSortedMaxPrice() {
        Integer maxPrice = sortService.getMaxPrice();
        return ResponseEntity.ok(maxPrice);
    }

    @GetMapping("/carClass")
    public ResponseEntity<List<ClassificationVo>> getSortedClassification() {
        List<ClassificationVo> classifications = sortService.getClassification();
        return ResponseEntity.ok(classifications);
    }
}
