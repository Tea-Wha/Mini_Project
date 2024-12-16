package com.kh.miniproject.service;

import com.kh.miniproject.repository.SortRepository;
import com.kh.miniproject.vo.CategoryVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class SortService {
    
    @Autowired
    FirebaseDirService firebaseDirService;
    
    private final SortRepository sortRepository;
    
    public List<CategoryVo> sortInfo(CategoryVo categoryVo) {
        String carName = categoryVo.getCarName();
        String manufacturer = categoryVo.getManufacturer();
        Integer minPrice = categoryVo.getMinPrice();
        Integer maxPrice = categoryVo.getMaxPrice();
        String engineType = categoryVo.getEngineType();
        String classification = categoryVo.getClassification();

        
        
        log.error("정보 : carName = {}, manufacturer = {}, min / max = {} / {}, engine = {}, classification = {}",
                carName, manufacturer, minPrice, maxPrice, engineType, classification);
        
        
        // Repository 에서 직접 정렬된 데이터 가져오기
        List<CategoryVo> rst = sortRepository.sortInfo(carName, manufacturer, minPrice, maxPrice, engineType, classification);
        log.warn("List : {}",rst);
        return rst;
    }
}