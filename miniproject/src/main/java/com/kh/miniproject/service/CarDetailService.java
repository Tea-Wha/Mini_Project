/* 서비스 로직이 따로 필요 없어 각 repo 메서드 호출만 */
package com.kh.miniproject.service;

import com.kh.miniproject.repository.CarDetailRepository;
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
public class CarDetailService {
    private final CarDetailRepository carDetailRepository;

    // 견적페이지 : repository 의 차량 불러오는 메서드 호출
    public CarVo getCarInfo(int carNo) {
        return carDetailRepository.getCarInfo(carNo);
    }

    // 견적페이지 : repository 의 차량색상 불러오는 메서드 호출
    public List<ColorVo> getColorInfo(int carNo) {
        return carDetailRepository.getColorInfo(carNo);
    }

    // 견적페이지 : repository 의 차량옵션 불러오는 메서드 호출
    public List<FeatureVo> getFeatureInfo(int carNo) {
        return carDetailRepository.getFeatureInfo(carNo);
    }
}
