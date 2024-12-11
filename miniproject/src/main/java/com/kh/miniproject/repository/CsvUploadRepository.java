package com.kh.miniproject.repository;


import com.kh.miniproject.vo.CsvVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Repository
public class CsvUploadRepository {

    private final JdbcTemplate jdbcTemplate;

    public void saveAll(List<CsvVo> records) {
        log.info("총 {}개의 레코드를 DB에 삽입 시도 중...", records.size());
        String INSERT_CARS = "INSERT INTO CARS (CAR_NO, CAR_NAME, CLASSIFICATION, MANUFACTURER_CODE, ENGINE_TYPE, " +
                "DISPLACEMENT, HORSEPOWER, TORQUE, EFFICIENCY, CAR_PRICE, CAR_FRONT_URL, CAR_AROUND_URL, " +
                "CAR_3D_URL, CAR_DESC, CAR_SUMMARY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        List<Object[]> batchArgs = new ArrayList<>();
        for (CsvVo record : records) {
            batchArgs.add(new Object[]{
                    record.getCarNo(),
                    record.getCarName(),
                    record.getClassification(),
                    record.getManufacturerNo(),
                    record.getEngineType(),
                    record.getDisplacement(),
                    record.getHorsePower(),
                    record.getTorque(),
                    record.getEfficiency(),
                    record.getCarPrice(),
                    record.getCarFrontUrl(),
                    record.getCarAroundUrl(),
                    record.getCar3dUrl(),
                    record.getCarDesc(),
                    record.getSummary()
            });
        }

        try {
            jdbcTemplate.batchUpdate(INSERT_CARS, batchArgs);
            log.info("레코드 삽입 성공.");
        } catch (Exception e) {
            log.error("레코드 삽입 중 오류 발생: {}", e.getMessage(), e);
            throw e;
        }
    }
}