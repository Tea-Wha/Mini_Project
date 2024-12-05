package com.kh.miniproject.controller;

import com.kh.miniproject.service.ListService;
import com.kh.miniproject.vo.ListVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/carList")
@RequiredArgsConstructor
public class ListController {
    private final ListService listService;
    
    @GetMapping("/search")
    public ResponseEntity<List<ListVo>> getFilteredCars(
        @RequestParam(required = false) String name,
        @RequestParam(required = false) String manufacturer,
        @RequestParam(required = false) Boolean isPrice,
        @RequestParam(required = false) Integer minPrice,
        @RequestParam(required = false) Integer maxPrice,
        @RequestParam(required = false) String engineType,
        @RequestParam(required = false) String classification,
        @RequestParam(required = false) String sortBy,
        @RequestParam(required = false) String sortType) {
        // 가격이 활성화된 경우(가격 범위 필터 적용)
        if (isPrice != null && isPrice) {
            log.info("가격 범위: {} - {}", minPrice, maxPrice);
        }
        log.error("Controller : carName = {}, manufacturer = {}, isPrice = {}, min / max = {} / {}, engine = {}, classification = {}, sort = {}, sortType = {}",name, manufacturer, isPrice, minPrice, maxPrice, engineType, classification, sortBy, sortType);
        // 서비스 로직 호출 (필터링된 자동차 목록 반환)
        List<ListVo> filteredCars = listService.getFilter(name, manufacturer, isPrice, minPrice, maxPrice, engineType, classification, sortBy, sortType);
        // 결과 반환
        return ResponseEntity.ok(filteredCars);
    }
}
