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
    
    public List<ListVo> getFiltered(ListVo listVo) {
        String carName = listVo.getCarName();
        String manufacturer = listVo.getManufacturer();
        Integer minPrice = listVo.getMinPrice();
        Integer maxPrice = listVo.getMaxPrice();
        String engineType = listVo.getEngineType();
        String classification = listVo.getClassification();
        log.error("service : carName = {}, manufacturer = {}, min / max = {} / {}, engine = {}, classification = {}",carName, manufacturer, minPrice, maxPrice, engineType, classification);
        // 가격이 활성화된 경우(가격 범위 필터 적용)
        
        
        // Repository 에서 직접 정렬된 데이터 가져오기
        return listRepository.getFilter(carName, manufacturer, minPrice, maxPrice, engineType, classification);
    }


}