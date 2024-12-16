package com.kh.miniproject.repository;


import com.kh.miniproject.vo.CarCsvVo;
import com.kh.miniproject.vo.ColorCsvVo;
import com.kh.miniproject.vo.FeatureCsvVo;
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

    public void saveAllForCar(List<CarCsvVo> records) {
        log.info("총 {}개의 차량 레코드를 DB에 삽입 시도 중...", records.size());
        String INSERT_CARS = "INSERT INTO CARS (CAR_NO, CAR_NAME, CLASSIFICATION, MANUFACTURER_CODE, ENGINE_TYPE, " +
                "DISPLACEMENT, HORSEPOWER, TORQUE, EFFICIENCY, CAR_PRICE, CAR_FRONT_URL, CAR_AROUND_URL, " +
                "CAR_3D_URL, CAR_DESC, CAR_SUMMARY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

        List<Object[]> batchArgs = new ArrayList<>();
        for (CarCsvVo carCsvVo : records) {
            batchArgs.add(new Object[]{
                    carCsvVo.getCarNo(),
                    carCsvVo.getCarName(),
                    carCsvVo.getClassification(),
                    carCsvVo.getManufacturerNo(),
                    carCsvVo.getEngineType(),
                    carCsvVo.getDisplacement(),
                    carCsvVo.getHorsePower(),
                    carCsvVo.getTorque(),
                    carCsvVo.getEfficiency(),
                    carCsvVo.getCarPrice(),
                    carCsvVo.getCarFrontUrl(),
                    carCsvVo.getCarAroundUrl().isEmpty() ? "d" : carCsvVo.getCarAroundUrl(),
                    carCsvVo.getCar3dUrl().isEmpty() ? "d" : carCsvVo.getCar3dUrl(),
	                  carCsvVo.getCarDesc().isEmpty() ? "d" : carCsvVo.getCarDesc(),
                    carCsvVo.getSummary().isEmpty() ? "d" : carCsvVo.getSummary(),
            });
        }

        try {
            jdbcTemplate.batchUpdate(INSERT_CARS, batchArgs);
            log.info("차량 레코드 삽입 성공.");
        } catch (Exception e) {
            log.error("차량 레코드 삽입 중 오류 발생: {}", e.getMessage(), e);
            throw e;
        }
    }

    public void saveAllForColor(List<ColorCsvVo> records) {
        log.info("총 {}개의 색상 레코드를 DB에 삽입 시도 중...", records.size());
        String INSERT_COLORS = "INSERT INTO CAR_COLORS (COLOR_NAME, COLOR_PRICE, COLOR_URL, CAR_NO) VALUES (?, ?, ?, ?)";

        List<Object[]> batchArgs = new ArrayList<>();
        for (ColorCsvVo colorCsvVo : records) {
            batchArgs.add(new Object[]{
                    colorCsvVo.getColorName(),
                    colorCsvVo.getColorPrice(),
                    colorCsvVo.getColorUrl(),
                    colorCsvVo.getCarNo(),
            });
        }
        try {
            jdbcTemplate.batchUpdate(INSERT_COLORS, batchArgs);
            log.info("색상 레코드 삽입 성공.");
        } catch (Exception e) {
            log.error("색상 레코드 삽입 중 오류 발생: {}", e.getMessage(), e);
            throw e;
        }
    }

    public void saveAllForFeature(List<FeatureCsvVo> records) {
        log.info("총 {}개의 옵션 레코드를 DB에 삽입 시도 중", records.size());
        String INSERT_FEATURES = "INSERT INTO CAR_FEATURES (FEATURE_NO, FEATURE_PRICE, FEATURE_TYPE, FEATURE_VALUE, CAR_NO, FEATURE_DESC) VALUES (?, ?, ?, ?, ?, ?)";

        List<Object[]> batchArgs = new ArrayList<>();
        for (FeatureCsvVo featureCsvVo : records) {
            batchArgs.add(new Object[]{
                    featureCsvVo.getFeatureNo(),
                    featureCsvVo.getFeaturePrice(),
                    featureCsvVo.getFeatureType(),
                    featureCsvVo.getFeatureValue(),
                    featureCsvVo.getCarNo(),
                    featureCsvVo.getFeatureDesc(),
            });
        }
        try {
            jdbcTemplate.batchUpdate(INSERT_FEATURES, batchArgs);
            log.info("옵션 레코드 삽입 성공.");
        } catch (Exception e) {
            log.error("옵션 레코드 삽입 중 오류 발생: {}", e.getMessage(), e);
            throw e;
        }
    }
}