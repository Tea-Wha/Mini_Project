package com.kh.miniproject.controller;

import com.kh.miniproject.service.SortService;
import com.kh.miniproject.vo.ClassificationVo;
import com.kh.miniproject.vo.EngineVo;
import com.kh.miniproject.vo.ManufacturerVo;
import com.kh.miniproject.vo.OptionsVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/carList")
@RequiredArgsConstructor
public class SortController {
    private final SortService sortService;

    @GetMapping("/companies")
    public ResponseEntity<List<OptionsVo>> getSortedManufacturer() {
        log.warn("제조사 컨트롤러 시작");
        List<OptionsVo> manufacturers = sortService.getManufacturer();
        log.warn("제조사 : {}", manufacturers);
        return ResponseEntity.ok(manufacturers);
    }

    @GetMapping("/engines")
    public ResponseEntity<List<OptionsVo>> getSortedEngine() {
        log.warn("엔진 컨트롤러 시작");
        List<OptionsVo> engines = sortService.getEngines();
        log.warn("엔진 : {}", engines);
        return ResponseEntity.ok(engines);
    }

    @GetMapping("/maxPrice")
    public ResponseEntity<Integer> getSortedMaxPrice() {
        Integer maxPrice = sortService.getMaxPrice();
        return ResponseEntity.ok(maxPrice);
    }

    @GetMapping("/carClasses")
    public ResponseEntity<List<OptionsVo>> getSortedClassification() {
        List<OptionsVo> classifications = sortService.getClassification();
        return ResponseEntity.ok(classifications);
    }
}
