package com.kh.miniproject.service;

import com.kh.miniproject.repository.SortRepository;
import com.kh.miniproject.vo.OptionVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class SortService {

    private final SortRepository sortRepository;
    
    public List<OptionVo> getManufacturer() {
        log.warn("제조사 서비스 작동");
        return sortRepository.getManufacturer();
    }

    public List<OptionVo> getEngines() {
        log.warn("엔진 서비스 작동");
        return sortRepository.getEngines();
    }

    public Integer getMaxPrice() {
        log.warn("최대 가격 서비스 작동");
        return sortRepository.getMaxPrice();
    }

    public List<OptionVo> getClassification() {
        log.warn("차종 서비스 작동");
        return sortRepository.getCarClasses();
    }

}


