package com.kh.miniproject.service;

import com.kh.miniproject.repository.SortRepository;
import com.kh.miniproject.vo.ClassificationVo;
import com.kh.miniproject.vo.EngineVo;
import com.kh.miniproject.vo.ManufacturerVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SortService {

    private final SortRepository sortRepository;
    
    public List<ManufacturerVo> getManufacturer() {
        return sortRepository.getManufacturer();
    }

    public List<EngineVo> getEngines() {
        return sortRepository.getEngines();
    }

    public Integer getMaxPrice() {
        return sortRepository.getMaxPrice();
    }

    public List<ClassificationVo> getClassification() {
        return sortRepository.getCarClasses();
    }

}


