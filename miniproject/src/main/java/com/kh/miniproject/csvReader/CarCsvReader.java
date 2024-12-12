//package com.kh.miniproject.csvReader;
//
//import com.kh.miniproject.vo.CarVo;
//import org.apache.commons.csv.CSVFormat;
//import org.apache.commons.csv.CSVRecord;
//import org.springframework.stereotype.Component;
//
//import java.io.FileInputStream;
//import java.io.FileReader;
//import java.io.InputStreamReader;
//import java.io.Reader;
//import java.nio.charset.StandardCharsets;
//import java.util.ArrayList;
//import java.util.List;
//
//import static java.lang.Double.parseDouble;
//
//@Component
//public class CarCsvReader {
//    public List<CarVo> readCsv(String filePath) throws Exception {
//        List<CarVo> dataList = new ArrayList<>();
//
//        try (Reader reader = new InputStreamReader(new FileInputStream(filePath), StandardCharsets.UTF_8)) {
//            Iterable<CSVRecord> records = CSVFormat.DEFAULT
//                    .withFirstRecordAsHeader()  // 첫 번째 줄을 헤더로 처리
//                    .parse(reader);
//
//            for (CSVRecord record : records) {
//                CarVo carVo = new CarVo();
//                carVo.setCarNo(Integer.parseInt(record.get("CAR_NO")));  // CSV 헤더 이름과 매칭
//                carVo.setCarName(record.get("CAR_NAME"));
//                carVo.setClassification(record.get("CLASSIFICATION"));
//                carVo.setManufacturerNo(Integer.parseInt(record.get("MANUFACTURER_CODE")));
//                carVo.setEngineType(record.get("ENGINE_TYPE"));
//                carVo.setDisplacement(parseDouble(record.get("DISPLACEMENT")));
//                carVo.setHorsePower(parseDouble(record.get("HORSEPOWER")));
//                carVo.setTorque(parseDouble(record.get("TORQUE")));
//                carVo.setEfficiency(parseDouble(record.get("EFFICIENCY")));
//                carVo.setCarPrice(Integer.parseInt(record.get("CAR_PRICE")));
//                carVo.setCarFrontUrl(record.get("CAR_FRONT_URL"));
//                carVo.setCarAroundUrl(record.get("CAR_AROUND_URL"));
//                carVo.setCar3dUrl(record.get("CAR_3D_URL"));
//                carVo.setCarDesc(record.get("CAR_DESC"));
//                carVo.setSummary(record.get("CAR_SUMMARY"));
//                dataList.add(carVo);
//            }
//        }
//        return dataList;
//    }
//}
