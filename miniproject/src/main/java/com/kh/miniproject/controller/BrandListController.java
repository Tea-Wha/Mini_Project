package com.kh.miniproject.controller;

import com.kh.miniproject.service.BrandListService;
import com.kh.miniproject.vo.BrandCarVo;
import com.kh.miniproject.vo.BrandVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/brand")
public class BrandListController {
	
	@Autowired
	private BrandListService brandListService;
	
	@GetMapping("/getBrand/{manufacturer}")
	public BrandVo getBrand(@PathVariable("manufacturer") String manufacturer) {
		BrandVo brandVo = brandListService.getBrandInfo(manufacturer);
		log.warn( "getBrand : {}", brandVo);
		return brandVo;
	}
	
	@GetMapping("/getCar/{manufacturer}")
	public List<BrandCarVo> getCar(@PathVariable("manufacturer") String manufacturer) {
		List<BrandCarVo> brandCarVo = brandListService.getBrandCarList(manufacturer);
		log.warn( "getCar : {}", brandCarVo);
		return brandCarVo;
	}
	
	@GetMapping("/all")
	public List<BrandVo> getAllBrand() {
		List<BrandVo> brandVoList = brandListService.getBrandAll();
		log.warn( "getAllBrand : {}", brandVoList);
		return brandVoList;
	}
}
