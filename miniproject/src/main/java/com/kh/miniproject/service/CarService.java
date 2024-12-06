package com.kh.miniproject.service;

import com.kh.miniproject.repository.CarRepository;
import com.kh.miniproject.vo.CarVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CarService {
    private final CarRepository carRepository;

    public List<CarVo> getCarInfo() {
        return carRepository.getCarInfo();
    }
}
