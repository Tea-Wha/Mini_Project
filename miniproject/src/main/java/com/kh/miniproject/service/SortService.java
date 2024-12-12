package com.kh.miniproject.service;

import com.kh.miniproject.repository.SortRepository;
import com.kh.miniproject.vo.CategoryVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class SortService {
    private final SortRepository sortRepository;
    
    public List<CategoryVo> sortInfo(CategoryVo categoryVo) {
        String carName = categoryVo.getCarName();
        String manufacturer = categoryVo.getManufacturer();
        Integer minPrice = categoryVo.getMinPrice();
        Integer maxPrice = categoryVo.getMaxPrice();
        String engineType = categoryVo.getEngineType();
        String classification = categoryVo.getClassification();
        String sortBy = categoryVo.getSortBy();
        String sortType = categoryVo.getSortType();
        log.error("정보 : carName = {}, manufacturer = {}, min / max = {} / {}, engine = {}, classification = {}, sort = {}, sortType = {}",
                carName, manufacturer, minPrice, maxPrice, engineType, classification, sortBy, sortType);
        
        log.info("정렬 기준: {} 정렬 방향: {}", sortBy, sortType);
        
        // Repository 에서 직접 정렬된 데이터 가져오기
        return sortRepository.sortInfo(carName, manufacturer, minPrice, maxPrice, engineType, classification, sortBy, sortType);
    }


}