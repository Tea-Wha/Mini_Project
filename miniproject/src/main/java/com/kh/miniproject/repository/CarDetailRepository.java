package com.kh.miniproject.repository;

import com.kh.miniproject.service.FirebaseDirService;
import com.kh.miniproject.vo.CarVo;
import com.kh.miniproject.vo.ColorVo;
import com.kh.miniproject.vo.FeatureVo;
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
public class CarDetailRepository {
    
    @Autowired
    private FirebaseDirService firebaseDirService;

    private final JdbcTemplate jdbcTemplate;
    private final String GET_CAR_INFO_FOR_DETAIL = "SELECT * FROM VM_CAR_DETAIL WHERE CAR_NO = ?";
    private final String GET_COLOR_INFO_FOR_DETAIL = "SELECT * FROM CAR_COLORS WHERE CAR_NO = ?";
    private final String GET_FEATURE_INFO_FOR_DETAIL = "SELECT * FROM CAR_FEATURES WHERE CAR_NO = ?";

    public CarVo getCarInfo(int carNo) {
        return jdbcTemplate.queryForObject(GET_CAR_INFO_FOR_DETAIL, new Object[]{carNo} , new CarRowMapper());
    }

    public List<ColorVo> getColorInfo(int carNo) {
        return jdbcTemplate.query(GET_COLOR_INFO_FOR_DETAIL, new Object[]{carNo} , new ColorRowMapper(firebaseDirService));
    }

    public List<FeatureVo> getFeatureInfo(int carNo) {
        return jdbcTemplate.query(GET_FEATURE_INFO_FOR_DETAIL, new Object[]{carNo} , new FeatureRowMapper());
    }

    // 차량 상세정보, 각 차량 상세 페이지에서 보여줄 객체 맵핑 (차량 전면부 사진을 제외한 나머지 URL 은 Null 처리)
    private static class CarRowMapper implements RowMapper<CarVo> {
        @Override
        public CarVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new CarVo(rs.getInt("CAR_NO"), rs.getString("CAR_NAME"), rs.getString("CLASSIFICATION"),
                    null, rs.getString("ENGINE_TYPE"), rs.getDouble("DISPLACEMENT"), rs.getInt("HORSEPOWER"),
                    rs.getDouble("TORQUE"), rs.getDouble("EFFICIENCY"), rs.getInt("CAR_PRICE"), null,
                    null, null, rs.getString("CAR_DESC"), rs.getString("CAR_SUMMARY"),
                    rs.getString("MANUFACTURER_NAME"), rs.getString("MANUFACTURER_URL"));
        }
    }
    
    public static class ColorRowMapper implements RowMapper<ColorVo> {
        
        private final FirebaseDirService firebaseDirService;
        
        // FirebaseDirService를 매개변수로 받는 생성자
        public ColorRowMapper(FirebaseDirService firebaseDirService) {
            this.firebaseDirService = firebaseDirService;
        }
        
        @Override
        public ColorVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            // 첫 번째 이미지 URL을 안전하게 가져오는 로직
            final String URL = rs.getString("COLOR_URL");
            log.warn("URL : {}", URL);
            List<String> colorUrls = firebaseDirService.getImageUrls("IMAGE/CAR_COLORCHIP/" + URL);
            List<String> carUrls = firebaseDirService.getImageUrls("IMAGE/CAR_REP_IMAGE/" + URL);
            
            String colorUrl = (colorUrls != null && !colorUrls.isEmpty()) ? colorUrls.get(0) : null;
            String carUrl = (carUrls != null && !carUrls.isEmpty()) ? carUrls.get(0) : null;
            
            return new ColorVo(
                rs.getString("COLOR_NAME"),
                rs.getInt("COLOR_PRICE"),
                colorUrl,
                carUrl
            );
        }
    }
    
    
    
    // 차량 옵션정보, 각 차량 상세 페이지에서 보여줄 객체 맵핑
    private static class FeatureRowMapper implements RowMapper<FeatureVo> {
        @Override
        public FeatureVo mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new FeatureVo(rs.getString("FEATURE_TYPE"), rs.getString("FEATURE_VALUE"), rs.getInt("FEATURE_PRICE"));
        }
    }

}
