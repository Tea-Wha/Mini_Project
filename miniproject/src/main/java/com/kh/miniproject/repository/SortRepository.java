package com.kh.miniproject.repository;

import com.kh.miniproject.vo.ClassificationVo;
import com.kh.miniproject.vo.EngineVo;
import com.kh.miniproject.vo.ManufacturerVo;
import lombok.RequiredArgsConstructor;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class SortRepository {

    private final JdbcTemplate jdbcTemplate;
    private static final String SORT_MANUFACTURERS = "SELECT COMPANY_NAME, IMAGE_URL FROM COMPANIES";
    private static final String SORT_MAX_PRICE = "SELECT MAX(PRICE) AS MAX_PRICE FROM CARS";
    private static final String SORT_ENGINES = "SELECT ENGINE_TYPE FROM ENGINES";
    private static final String SORT_CLASSIFICATIONS = "SELECT CLASSIFICATION_NAME FROM CLASSIFICATIONS";

    // 제조사 리스트 조회
    public List<ManufacturerVo> getManufacturer() {
        return jdbcTemplate.query(SORT_MANUFACTURERS, new ManufacturerRowMapper());
    }

    // 엔진 타입 리스트 조회
    public List<EngineVo> getEngines() {
        return jdbcTemplate.query(SORT_ENGINES, new EngineRowMapper());
    }

    // 최대 가격 조회
    public Integer getMaxPrice() {
        return jdbcTemplate.queryForObject(SORT_MAX_PRICE, Integer.class);
    }

    // 자동차 클래스 리스트 조회
    public List<ClassificationVo> getCarClasses() {
        return jdbcTemplate.query(SORT_CLASSIFICATIONS, new ClassificationRowMapper());
    }

    private static class ManufacturerRowMapper implements RowMapper<ManufacturerVo> {
        @Override
        public ManufacturerVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ManufacturerVo(rs.getString("MANUFACTURER_NAME"), rs.getString("IMAGE_URL"));
        }
    }

    private static class EngineRowMapper implements RowMapper<EngineVo> {
        @Override
        public EngineVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new EngineVo(rs.getString("ENGINE_TYPE"));
        }
    }

    private static class ClassificationRowMapper implements RowMapper<ClassificationVo> {
        @Override
        public ClassificationVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ClassificationVo(rs.getString("CLASSIFICATION"));
        }
    }
}



