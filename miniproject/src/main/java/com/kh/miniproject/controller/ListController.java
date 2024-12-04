package com.kh.miniproject.controller;

import com.kh.miniproject.service.ListService;
import com.kh.miniproject.vo.ListVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/carList")
@RequiredArgsConstructor
public class ListController {
    private final ListService listService;

    @GetMapping("/search")
    public ResponseEntity<List<ListVo>> getFilteredCars(
            @RequestParam(required = false) String carName,
            @RequestParam(required = false) String manufacturer,
            @RequestParam(required = false) Integer minPrice,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) String engineType,
            @RequestParam(required = false) String classification) {

        List<ListVo> filteredCars = listService.getFilter(carName, manufacturer, minPrice, maxPrice, engineType, classification);
        return ResponseEntity.ok(filteredCars);
    }
}
