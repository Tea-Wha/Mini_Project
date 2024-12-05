package com.kh.miniproject.repository;

import com.kh.miniproject.vo.ClassificationVo;
import com.kh.miniproject.vo.EngineVo;
import com.kh.miniproject.vo.ManufacturerVo;
import com.kh.miniproject.vo.OptionsVo;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
@Slf4j
@Repository
@RequiredArgsConstructor
public class SortRepository {

    private final JdbcTemplate jdbcTemplate;
    private static final String SORT_MANUFACTURERS = "SELECT MANUFACTURER_NAME, IMAGE_URL FROM MANUFACTURERS";
    private static final String SORT_MAX_PRICE = "SELECT MAX(PRICE) AS MAX_PRICE FROM CARS";
    private static final String SORT_ENGINES = "SELECT ENGINE_TYPE FROM ENGINES";
    private static final String SORT_CLASSIFICATIONS = "SELECT CLASSIFICATION FROM CLASSIFICATIONS";

    // 제조사 리스트 조회
    public List<OptionsVo> getManufacturer() {
        log.info("리포지터리 : 제조사");
        return jdbcTemplate.query(SORT_MANUFACTURERS, new ManufacturerRowMapper());
    }

    // 엔진 타입 리스트 조회
    public List<OptionsVo> getEngines() {
        log.info("리포지터리 : 엔진");
        return jdbcTemplate.query(SORT_ENGINES, new EngineRowMapper());
    }

    // 최대 가격 조회
    public Integer getMaxPrice() {
        log.info("리포지터리 : 가격");
        return jdbcTemplate.queryForObject(SORT_MAX_PRICE, Integer.class);
    }

    // 자동차 클래스 리스트 조회
    public List<OptionsVo> getCarClasses() {
        log.info("리포지터리 : 차종");
        return jdbcTemplate.query(SORT_CLASSIFICATIONS, new ClassificationRowMapper());
    }
    
    
    

    private static class ManufacturerRowMapper implements RowMapper<OptionsVo> {
        @Override
        public OptionsVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new OptionsVo(rs.getString("MANUFACTURER_NAME"), rs.getString("IMAGE_URL"),null);
        }
    }

    private static class EngineRowMapper implements RowMapper<OptionsVo> {
        @Override
        public OptionsVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new OptionsVo(rs.getString("ENGINE_TYPE"),null,null);
        }
    }

    private static class ClassificationRowMapper implements RowMapper<OptionsVo> {
        @Override
        public OptionsVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new OptionsVo(rs.getString("CLASSIFICATION"),null,null);
        }
    }
}



