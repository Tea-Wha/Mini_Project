package com.kh.miniproject.repository;

import com.kh.miniproject.service.FirebaseDirService;
import com.kh.miniproject.util.RepImagePaths;
import com.kh.miniproject.vo.CategoryVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
@Slf4j
public class SortRepository {
    private final JdbcTemplate jdbcTemplate;
    
    @Autowired
    private FirebaseDirService firebaseDirService;

    public List<CategoryVo> sortInfo(String carName, String manufacturer, Integer minPrice, Integer maxPrice,
                                    String engineType, String classification) {
        StringBuilder sql = new StringBuilder("SELECT * FROM VM_LIST_CAR WHERE 1=1 ");
        List<Object> params = new ArrayList<>();
        log.error("repository : carName = {}, manufacturer = {}, min / max = {} / {}, engine = {}, classification = {}",
                carName, manufacturer, minPrice, maxPrice, engineType, classification);

        if (carName != null && !carName.isEmpty()) {
            sql.append("AND UPPER(CAR_NAME) LIKE UPPER(?) ");
            params.add("%" + carName + "%");  // LIKE 조건에 %를 추가
        }

        if (manufacturer != null && !manufacturer.isEmpty()) {
            List<String> manufacturerList = List.of(manufacturer.split(","));
            sql.append("AND ( 1=-1");
            for (String e : manufacturerList) {
                sql.append(" OR MANUFACTURER_NAME = ? ");
                params.add(e);
            }
            sql.append(")");
            
        }
        
        
        if (minPrice != null) {
            sql.append("AND CAR_PRICE >= ? ");
            params.add(minPrice);
        }
        
        if (maxPrice != null) {
            sql.append("AND CAR_PRICE <= ? ");
            params.add(maxPrice);
        }
        

        if (engineType != null && !engineType.isEmpty()) {
            List<String> engineList = List.of(engineType.split(","));
            sql.append("AND ( 1=-1");
            for (String e : engineList) {
                sql.append(" OR ENGINE_TYPE = ? ");
                params.add(e);
            }
            sql.append(")");
            
        }

        if (classification != null && !classification.isEmpty()) {
            List<String> classificationList = List.of(classification.split(","));
            sql.append("AND ( 1=-1");
            for (String e : classificationList) {
                sql.append(" OR CLASSIFICATION = ? ");
                params.add(e);
            }
            sql.append(")");
            
        }
        

        //쿼리 날린 후에 값 보기 
        log.warn("쿼리문 : {}", sql);

        return jdbcTemplate.query(sql.toString(), params.toArray(), new RowMapper<CategoryVo>() {
            @Override
            public CategoryVo mapRow(ResultSet rs, int rowNum) throws SQLException {
                CategoryVo categoryVo = new CategoryVo();
                categoryVo.setCarNo(rs.getInt("CAR_NO"));
                categoryVo.setCarName(rs.getString("CAR_NAME"));
                categoryVo.setManufacturer(rs.getString("MANUFACTURER_NAME"));
                categoryVo.setPrice(rs.getInt("CAR_PRICE"));
                categoryVo.setEngineType(rs.getString("ENGINE_TYPE"));
                categoryVo.setClassification(rs.getString("CLASSIFICATION"));
                categoryVo.setManufacturerUrl(rs.getString("MANUFACTURER_URL"));
//                categoryVo.setCarFrontUrl(rs.getString("CAR_FRONT_URL"));
                return categoryVo;
            }
        });
    }
}

