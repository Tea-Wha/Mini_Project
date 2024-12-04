package com.kh.miniproject.service;

import com.kh.miniproject.repository.ListRepository;
import com.kh.miniproject.vo.ListVo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ListService {
    private final ListRepository listRepository;

    public List<ListVo> getFilter(String carName, String manufacturer, Integer minPrice, Integer maxPrice, String engineType, String classification) {
        return listRepository.getFilter(carName, manufacturer, minPrice, maxPrice, engineType, classification);
    }
}