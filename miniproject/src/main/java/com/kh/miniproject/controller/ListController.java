package com.kh.miniproject.controller;

import com.kh.miniproject.service.ListService;
import com.kh.miniproject.vo.ListVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/carList")
@RequiredArgsConstructor
public class ListController {
    private final ListService listService;
    
    @PostMapping("/search")
    public ResponseEntity<List<ListVo>> getFiltered(@RequestBody ListVo listVo) {
        // 서비스 로직 호출 (필터링된 자동차 목록 반환)
        List<ListVo> filteredCars = listService.getFiltered(listVo);
        // 결과 반환
        return ResponseEntity.ok(filteredCars);
    }
}