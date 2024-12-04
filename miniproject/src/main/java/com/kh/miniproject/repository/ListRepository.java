package com.kh.miniproject.repository;

import com.kh.miniproject.vo.ListVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class ListRepository {
    private final JdbcTemplate jdbcTemplate;

    public List<ListVo> getFilter(String carName, String manufacturer, Integer minPrice, Integer maxPrice, String engineType, String classification) {
        StringBuilder sql = new StringBuilder("SELECT * FROM VM_FILTER_CAR WHERE 1=1 ");
        List<Object> params = new ArrayList<>();
        if (carName != null && !carName.isEmpty()) {
            sql.append("AND CAR_NAME LIKE ?");
            params.add(carName);
        }
        if (manufacturer != null && !manufacturer.isEmpty()) {
            sql.append("AND MANUFACTURER_NAME = ? ");
            params.add(manufacturer);
        }
        if (minPrice != null) {
            sql.append("AND PRICE >= ? ");
            params.add(minPrice);
        }
        if (maxPrice != null) {
            sql.append("AND PRICE <= ? ");
            params.add(maxPrice);
        }
        if (engineType != null && !engineType.isEmpty()) {
            sql.append("AND ENGINE_TYPE = ? ");
            params.add(engineType);
        }
        if (classification != null && !classification.isEmpty()) {
            sql.append("AND CLASSIFICATION = ? ");
            params.add(classification);
        }

        log.info("Executing query: {}", sql);
        return jdbcTemplate.query(sql.toString(), params.toArray(), new RowMapper<ListVo>() {
            @Override
            public ListVo mapRow(ResultSet rs, int rowNum) throws SQLException {
                ListVo listVo = new ListVo();
                listVo.setCarName(rs.getString("CAR_NAME"));
                listVo.setManufacturer(rs.getString("MANUFACTURER_NAME"));
                listVo.setPrice(rs.getInt("PRICE"));
                listVo.setEngineType(rs.getString("ENGINE_TYPE"));
                listVo.setClassification(rs.getString("CLASSIFICATION"));
                return listVo;
            }
        });
    }
}
