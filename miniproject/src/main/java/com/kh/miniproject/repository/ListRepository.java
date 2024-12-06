package com.kh.miniproject.repository;
import com.kh.miniproject.vo.ListVo;
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
public class ListRepository {

    private final JdbcTemplate jdbcTemplate;
    private static final String GET_MANUFACTURER = "SELECT MANUFACTURER_NAME, IMAGE_URL FROM MANUFACTURERS";
    private static final String GET_ENGINES = "SELECT ENGINE_TYPE FROM ENGINES";
    private static final String GET_MAX_PRICE = "SELECT MAX(CAR_PRICE) AS MAX_PRICE FROM CARS";
    private static final String GET_CLASSIFICATION = "SELECT CLASSIFICATION FROM CLASSIFICATIONS";

    // 제조사 리스트 조회
    public List<ListVo> getManufacturer() {
        log.info("리포지터리 : 제조사");
        return jdbcTemplate.query(GET_MANUFACTURER, new ManufacturerRowMapper());
    }

    // 엔진 타입 리스트 조회
    public List<ListVo> getEngines() {
        log.info("리포지터리 : 엔진");
        return jdbcTemplate.query(GET_ENGINES, new EngineRowMapper());
    }

    // 최대 가격 조회
    public Integer getMaxPrice() {
        log.info("리포지터리 : 가격");
        return jdbcTemplate.queryForObject(GET_MAX_PRICE, Integer.class);
    }

    // 자동차 클래스 리스트 조회
    public List<ListVo> getCarClasses() {
        log.info("리포지터리 : 차종");
        return jdbcTemplate.query(GET_CLASSIFICATION, new ClassificationRowMapper());
    }




    private static class ManufacturerRowMapper implements RowMapper<ListVo> {
        @Override
        public ListVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ListVo(rs.getString("MANUFACTURER_NAME"), rs.getString("MANUFACTURER_URL"));
        }
    }

    private static class EngineRowMapper implements RowMapper<ListVo> {
        @Override
        public ListVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ListVo(rs.getString("ENGINE_TYPE"),null);
        }
    }

    private static class ClassificationRowMapper implements RowMapper<ListVo> {
        @Override
        public ListVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ListVo(rs.getString("CLASSIFICATION"),null);
        }
    }
}



