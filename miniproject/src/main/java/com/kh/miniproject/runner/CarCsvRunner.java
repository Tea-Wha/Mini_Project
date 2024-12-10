package com.kh.miniproject.runner;

import com.kh.miniproject.csvReader.CarCsvReader;
import com.kh.miniproject.service.CarCsvService;
import com.kh.miniproject.vo.CarVo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CarCsvRunner implements CommandLineRunner {
    private final CarCsvReader carCsvReader;
    private final CarCsvService carCsvService;


    @Override
    public void run(String... args) throws Exception {
        String filePath = "src/main/java/com/kh/miniproject/csvFiles/Cars.csv";
        List<CarVo> dataList = carCsvReader.readCsv(filePath);
        carCsvService.insertData(dataList.toString());
        System.out.println("CSV 데이터가 DB에 성공적으로 저장되었습니다.");
    }
}
