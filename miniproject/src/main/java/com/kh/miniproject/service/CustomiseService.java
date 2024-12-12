/* 서비스 로직이 따로 필요 없어 각 repo 메서드 호출만 */
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

    // 견적페이지 : repository 의 차량 불러오는 메서드 호출
    public List<CarVo> getCarInfo() {
        return customiseRepository.getCarInfo();
    }

    // 견적페이지 : repository 의 차량색상 불러오는 메서드 호출
    public List<ColorVo> getColorInfo() {
        return customiseRepository.getColorInfo();
    }

    // 견적페이지 : repository 의 차량옵션 불러오는 메서드 호출
    public List<FeatureVo> getFeatureInfo() {
        return customiseRepository.getFeatureInfo();
    }
}
