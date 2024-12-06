package com.kh.miniproject.controller;

import com.kh.miniproject.service.ListService;
import com.kh.miniproject.vo.ListVo;
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
public class ListController {
    private final ListService listService;

    @GetMapping("/companies")
    public ResponseEntity<List<ListVo>> getManufacturer() {
        log.warn("제조사 컨트롤러 시작");
        List<ListVo> manufacturers = listService.getManufacturer();
        log.warn("제조사 : {}", manufacturers);
        return ResponseEntity.ok(manufacturers);
    }

    @GetMapping("/engines")
    public ResponseEntity<List<ListVo>> getEngine() {
        log.warn("엔진 컨트롤러 시작");
        List<ListVo> engines = listService.getEngines();
        log.warn("엔진 : {}", engines);
        return ResponseEntity.ok(engines);
    }

    @GetMapping("/maxPrice")
    public ResponseEntity<Integer> getMaxPrice() {
        Integer maxPrice = listService.getMaxPrice();
        return ResponseEntity.ok(maxPrice);
    }

    @GetMapping("/carClasses")
    public ResponseEntity<List<ListVo>> getClassification() {
        List<ListVo> classifications = listService.getClassification();
        return ResponseEntity.ok(classifications);
    }
}
