package com.kh.miniproject.repository;

import com.kh.miniproject.vo.CarVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;

@Slf4j
@Repository
@RequiredArgsConstructor
public class CustomizeRepository {

    private final JdbcTemplate jdbcTemplate;
    private final String GET_CAR_INFO_FOR_CUSTOM = "SELECT * FROM CARS WHERE CAR_NO = ? ";
    

    public CarVo getCarInfo(int carNo) {
        return jdbcTemplate.queryForObject(GET_CAR_INFO_FOR_CUSTOM, new Object[]{carNo}, new CarRowMapper());
    }

    

    // 차량 상세정보, 견적시에 페이지에서 보여줄 객체 맵핑 (차량 전면부 사진은 null 처리)
    private static class CarRowMapper implements RowMapper<CarVo> {
        @Override
        public CarVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new CarVo(rs.getInt("CAR_NO"), rs.getString("CAR_NAME"), null,
                    null, null, 0, 0,
                    0, 0, rs.getInt("CAR_PRICE"), null,
                    rs.getString("CAR_AROUND_URL"), rs.getString("CAR_3D_URL"), null, null,
                    null, null);
        }
    }

}
