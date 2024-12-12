/* 서비스 로직이 따로 필요 없어 각 repo 메서드 호출만 */
package com.kh.miniproject.service;

import com.kh.miniproject.repository.CustomizeRepository;
import com.kh.miniproject.vo.CarVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomizeService {
    private final CustomizeRepository customizeRepository;

    // 견적페이지 : repository 의 차량 불러오는 메서드 호출
    public CarVo getCarInfo(int carNo) {
        return customizeRepository.getCarInfo(carNo);
    }
    
}
