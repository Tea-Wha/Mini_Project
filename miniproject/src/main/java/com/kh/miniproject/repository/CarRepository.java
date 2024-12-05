package com.kh.miniproject.repository;

import com.kh.miniproject.vo.CarVo;
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
public class CarRepository {

    private final JdbcTemplate jdbcTemplate;
    private final String CAR_DETAIL_INFO = "SELECT * FROM VM_CARS";    // 이너조인 걸려있는 뷰 생성후에 해야할듯?

    public List<CarVo> getCarInfo() {
        return jdbcTemplate.query(CAR_DETAIL_INFO, new CarRowMapper());
    }

    private static class CarRowMapper implements RowMapper<CarVo> {
        @Override
        public CarVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new CarVo(rs.getInt("CAR_NO"), rs.getString("CAR_NAME"), rs.getString("CLASSIFICATION"),
                    rs.getString("ENGINE_TYPE"), rs.getDouble("DISPLACEMENT"), rs.getInt("POWER"),
                    rs.getDouble("TORQUE"), rs.getDouble("EFFICIENCY"), rs.getInt("PRICE"),
                    rs.getString("CAR_DESC"), rs.getString("CAR_SUMMARY"));
        }
    }
}
