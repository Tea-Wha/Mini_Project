package com.kh.miniproject.service;

import com.kh.miniproject.repository.ListRepository;
import com.kh.miniproject.vo.ListVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
@Slf4j
@Service
@RequiredArgsConstructor
public class ListService {

    private final ListRepository listRepository;
    
    public List<ListVo> getManufacturer() {
        log.warn("제조사 서비스 작동");
        return listRepository.getManufacturer();
    }

    public List<ListVo> getEngines() {
        log.warn("엔진 서비스 작동");
        return listRepository.getEngines();
    }

    public Integer getMaxPrice() {
        log.warn("최대 가격 서비스 작동");
        return listRepository.getMaxPrice();
    }

    public List<ListVo> getClassification() {
        log.warn("차종 서비스 작동");
        return listRepository.getCarClasses();
    }

}


