/*  */
package com.kh.miniproject.controller;

import com.kh.miniproject.service.ListService;
import com.kh.miniproject.service.SortService;
import com.kh.miniproject.vo.CategoryVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/carList")
@RequiredArgsConstructor
public class SortController {
    private final SortService sortService;
    
    @PostMapping("/search")
    public ResponseEntity<List<CategoryVo>> setInfo(@RequestBody CategoryVo categoryVo) {
        log.warn("실행");
        log.error(categoryVo.toString());
        // 서비스 로직 호출 (필터링된 자동차 목록 반환)
        List<CategoryVo> sortedInfo = sortService.sortInfo(categoryVo);
        log.error(sortedInfo.toString());
        // 결과 반환
        return ResponseEntity.ok(sortedInfo);
    }
}