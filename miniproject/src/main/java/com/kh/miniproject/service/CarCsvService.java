//package com.kh.miniproject.service;
//
//import com.kh.miniproject.csvReader.CarCsvReader;
//import com.kh.miniproject.vo.CarVo;
//import lombok.RequiredArgsConstructor;
//import org.springframework.jdbc.core.JdbcTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class CarCsvService {
//    private final JdbcTemplate jdbcTemplate;
//    private final CarCsvReader carCsvReader;
//
//    public void insertData(String filePath) throws Exception {
//        List<CarVo> dataList = carCsvReader.readCsv(filePath);
//
//        String query = "INSERT INTO CARS (CAR_NO, CAR_NAME, CLASSIFICATION, MANUFACTURER_CODE, ENGINE_TYPE, " +
//                "DISPLACEMENT, HORSEPOWER, TORQUE, EFFICIENCY, CAR_PRICE, CAR_FRONT_URL, CAR_AROUND_URL, " +
//                "CAR_3D_URL, CAR_DESC, CAR_SUMMARY) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
//
//        for (CarVo carVO : dataList) {
//            jdbcTemplate.update(query, carVO.getCarNo(), carVO.getCarName(), carVO.getClassification(), carVO.getManufacturerNo(),
//                    carVO.getEngineType(), carVO.getDisplacement(), carVO.getHorsePower(), carVO.getTorque(),
//                    carVO.getEfficiency(), carVO.getCarPrice(), carVO.getCarFrontUrl(), carVO.getCarAroundUrl(),
//                    carVO.getCar3dUrl(), carVO.getCarDesc(), carVO.getSummary());
//    }
//}
//}
