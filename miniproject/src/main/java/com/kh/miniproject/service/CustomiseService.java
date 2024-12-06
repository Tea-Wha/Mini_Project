package com.kh.miniproject.service;

import com.kh.miniproject.repository.CustomiseRepository;
import com.kh.miniproject.vo.CarVo;
import com.kh.miniproject.vo.ColorVo;
import com.kh.miniproject.vo.FeatureVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomiseService {
    private final CustomiseRepository customiseRepository;

    public List<CarVo> getCarInfo() {
        return customiseRepository.getCarInfo();
    }

    public List<ColorVo> getColorInfo() {
        return customiseRepository.getColorInfo();
    }

    public List<FeatureVo> getFeatureInfo() {
        return customiseRepository.getFeatureInfo();
    }
}
