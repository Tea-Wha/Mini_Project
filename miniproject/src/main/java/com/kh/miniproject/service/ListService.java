package com.kh.miniproject.service;

import com.kh.miniproject.repository.ListRepository;
import com.kh.miniproject.vo.ListVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ListService {
    private final ListRepository listRepository;
    
    public List<ListVo> getFilter(String carName, String manufacturer, Boolean isPrice, Integer minPrice, Integer maxPrice,
                                    String engineType, String classification, String sortBy, String sortType) {
        log.error("service : carName = {}, manufacturer = {}, isPrice = {}, min / max = {} / {}, engine = {}, classification = {}, sort = {}, sortType = {}",carName, manufacturer, isPrice, minPrice, maxPrice, engineType, classification, sortBy, sortType);
        // 가격이 활성화된 경우(가격 범위 필터 적용)
        
        log.info("정렬 기준: {} 정렬 방향: {}", sortBy, sortType);
        
        // Repository에서 직접 정렬된 데이터 가져오기
        return listRepository.getFilter(carName, manufacturer, isPrice, minPrice, maxPrice, engineType, classification, sortBy, sortType);
    }
}