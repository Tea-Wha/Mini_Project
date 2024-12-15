package com.kh.miniproject.repository;

import com.kh.miniproject.service.FirebaseDirService;
import com.kh.miniproject.vo.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Slf4j
@Repository
@RequiredArgsConstructor
public class BrandListRepository {
	@Autowired
	private FirebaseDirService firebaseDirService;
	
	private final JdbcTemplate jdbcTemplate;
	private final static String MANUFACTURER_INFO = "SELECT MANUFACTURER_NAME, MANUFACTURER_URL, COUNTRY FROM MANUFACTURERS WHERE MANUFACTURER_NAME = ?";
	private final static String BRAND_CARS = "SELECT CAR_NO, CAR_NAME, CAR_FRONT_URL, CAR_PRICE FROM VM_LIST_CAR WHERE MANUFACTURER_NAME = ?";
	private final static String BRAND_ALL = "SELECT MANUFACTURER_NAME, MANUFACTURER_URL, COUNTRY FROM MANUFACTURERS";
	
	public BrandVo getBrandInfo(String manufacturerName) {
		log.info("제조사 : {}", manufacturerName);
		return jdbcTemplate.queryForObject(MANUFACTURER_INFO, new Object[]{manufacturerName}, new BrandInfoRowMapper());
	}
	
	public List<BrandCarVo> getBrandCars(String manufacturerName) {
		log.info("제조사 차 : {}", manufacturerName);
		return jdbcTemplate.query(BRAND_CARS, new Object[]{manufacturerName}, new BrandCarRowMapper(firebaseDirService));
	}

	public List<BrandVo> getBrandAll() {
		return jdbcTemplate.query(BRAND_ALL, new BrandInfoRowMapper());
	}
	
	public static class BrandInfoRowMapper implements RowMapper<BrandVo> {
		
		@Override
		public BrandVo mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new BrandVo(rs.getString("MANUFACTURER_NAME"), rs.getString("MANUFACTURER_URL"), rs.getString("COUNTRY"));
		}
	}
	

	
	public static class BrandCarRowMapper implements RowMapper<BrandCarVo> {
		
		private final FirebaseDirService firebaseDirService;
		
		// FirebaseDirService를 매개변수로 받는 생성자
		public BrandCarRowMapper(FirebaseDirService firebaseDirService) {
			this.firebaseDirService = firebaseDirService;
		}
		
		@Override
		public BrandCarVo mapRow(ResultSet rs, int rowNum) throws SQLException {
			// 첫 번째 이미지 URL을 안전하게 가져오는 로직
			final String URL = rs.getString("CAR_FRONT_URL");
			log.warn("URL : {}", URL);
			List<String> carUrls = firebaseDirService.getImageUrls("IMAGE/CAR_REP_IMAGE/" + URL);
			
			String carUrl = (carUrls != null && !carUrls.isEmpty()) ? carUrls.get(0) : null;
			
			return new BrandCarVo(
				rs.getInt("CAR_NO"),
				rs.getString("CAR_NAME"),
				carUrl,
				rs.getInt("CAR_PRICE")
			);
		}
	}
}
