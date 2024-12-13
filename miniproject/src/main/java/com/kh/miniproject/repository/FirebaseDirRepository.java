package com.kh.miniproject.repository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Slf4j
@Repository
@RequiredArgsConstructor
public class FirebaseDirRepository {
	
	private final JdbcTemplate jdbcTemplate;
	private static final String GET_DIR = "SELECT CAR_3D_URL FROM CAR_COLORS WHERE  CAR_NO = ? AND CAR_COLOR = ?";
	private static final String TEST_DIR = "SELECT COLOR_URL FROM CAR_COLORS";
	
	public String getCarDir(int carNo, String color) {
		log.warn("차번호 {} 의 색상 {} 의 디렉토리 조회중", carNo, color);
		//return jdbcTemplate.queryForObject(GET_DIR, String.class, carNo, color);
		
		return jdbcTemplate.queryForObject(TEST_DIR, String.class);
	}
}
