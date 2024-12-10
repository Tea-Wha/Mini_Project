package com.kh.miniproject.repository;

import com.kh.miniproject.vo.CarVo;
import com.kh.miniproject.vo.ColorVo;
import com.kh.miniproject.vo.FeatureVo;
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
public class CustomiseRepository {

    private final JdbcTemplate jdbcTemplate;
    private final String GET_CAR_INFO = "SELECT * FROM VM_CAR_DETAIL";
    private final String GET_COLOR_INFO = "SELECT * FROM VM_CAR_COLOR";
    private final String GET_FEATURE_IN = "SELECT * FROM VM_CAR_FEATURE";

    public List<CarVo> getCarInfo() {
        return jdbcTemplate.query(GET_CAR_INFO, new CarRowMapper());
    }

    public List<ColorVo> getColorInfo() {
        return jdbcTemplate.query(GET_COLOR_INFO, new ColorRowMapper());
    }

    public List<FeatureVo> getFeatureInfo() {
        return jdbcTemplate.query(GET_FEATURE_IN, new FeatureRowMapper());
    }

    // 차량 상세정보, 견적시에 페이지에서 보여줄 객체 맵핑후 컨트롤러로 전달 (차량 전면부 사진은 null 처리)
    private static class CarRowMapper implements RowMapper<CarVo> {
        @Override
        public CarVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new CarVo(rs.getInt("CAR_NO"), rs.getString("CAR_NAME"), rs.getString("CLASSIFICATION"),
                   null, rs.getString("ENGINE_TYPE"), rs.getDouble("DISPLACEMENT"), rs.getInt("HORSEPOWER"),
                    rs.getDouble("TORQUE"), rs.getDouble("EFFICIENCY"), rs.getInt("PRICE"), null,
                    rs.getString("CAR_AROUND_URL"), null, rs.getString("CAR_DESC"), rs.getString("CAR_SUMMARY"),
                    rs.getString("MANUFACTURER"), rs.getString("MANUFACTURER_URL"));
        }
    }

    // 차량 색상정보, 견적시에 페이지에서 보여줄 객체 맵핑후 컨트롤러로 전달
    private static class ColorRowMapper implements RowMapper<ColorVo> {
        @Override
        public ColorVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new ColorVo(rs.getString("COLOR_NAME"), rs.getInt("COLOR_PRICE"), rs.getString("COLOR_URL"));
        }
    }

    // 차량 옵션정보, 견적시에 페이지에서 보여줄 객체 맵핑후 컨트롤러로 전달
    private static class FeatureRowMapper implements RowMapper<FeatureVo> {
        @Override
        public FeatureVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new FeatureVo(rs.getString("FEATURE_TYPE"), rs.getString("FEATURE_VALUE"), rs.getInt("FEATURE_PRICE"),
                    rs.getString("FEATURE_URL"), rs.getString("FEATURE_DESC"));
        }
    }

}
