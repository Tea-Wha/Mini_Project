package com.kh.miniproject.service;

import com.kh.miniproject.repository.BrandListRepository;
import com.kh.miniproject.vo.BrandCarVo;
import com.kh.miniproject.vo.BrandVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class BrandListService {
	
	@Autowired
	private final BrandListRepository brandListRepository;
	
	public BrandVo getBrandInfo(String manufacturerName) {
		return brandListRepository.getBrandInfo(manufacturerName);
	}
	
	public List<BrandCarVo> getBrandCarList(String manufacturerName) {
		return brandListRepository.getBrandCars(manufacturerName);
	}
}
