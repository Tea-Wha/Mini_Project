package com.kh.miniproject.service;

import com.kh.miniproject.repository.CsvUploadRepository;
import com.kh.miniproject.vo.CsvVo;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvException;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CsvUploadService {
    private final CsvUploadRepository csvUploadRepository;

    // CSV 파일을 파싱하고 DB에 저장
    public void processCsv(MultipartFile file) throws IOException {
        log.info("파일 업로드 시작: {}", file.getOriginalFilename()); // 파일 이름 출력

        List<CsvVo> records = parseCsv(file);

        log.info("CSV 파일 파싱 완료, DB 저장 시작...");
        csvUploadRepository.saveAll(records);

        log.info("과정 완료: {}", records);  // 파싱 후 저장된 데이터 로그 출력
    }

    // CSV 파일을 파싱하는 메서드
    private List<CsvVo> parseCsv(MultipartFile file) throws IOException {
        log.info("CSV 파일 파싱 시작: {}", file.getOriginalFilename());
        List<CsvVo> records = new ArrayList<>();
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {
            List<String[]> lines = csvReader.readAll();
            if (lines.isEmpty()) {
                log.warn("CSV 파일 내부에 데이터가 없습니다.");
                return records;
            }
            String[] header = lines.get(0);
            if (header.length != 15) {
                log.error("CSV 헤더의 열 수가 올브라지 않습니다. 예상: 열 15 개 중 현재 : {}", header.length);
                throw new IOException("CSV 헤더의 열 수가 올바르지 않습니다.");
            }
            for (int i = 1; i < lines.size(); i++) {
                String[] line = lines.get(i);
                if (line.length != 15) {
                    log.warn("CSV 행의 열 수가 올바르지 않습니다. 행 번호: {}, 데이터 {}", i + 1, Arrays.toString(line));
                    continue; // 행스킵
                }
                try {
                    CsvVo csvVo = new CsvVo(
                            Integer.parseInt(line[0].trim()), // CAR_NO
                            line[1].trim(), // CAR_NAME
                            line[2].trim().toUpperCase(), // CLASSIFICATION
                            Integer.parseInt(line[3].trim()), // MANUFACTURER_CODE
                            line[4].trim(), // ENGINE_TYPE
                            Double.parseDouble(line[5].trim()), // DISPLACEMENT
                            Double.parseDouble(line[6].trim()), // HORSEPOWER
                            Double.parseDouble(line[7].trim()), // TORQUE
                            Double.parseDouble(line[8].trim()), // EFFICIENCY
                            Integer.parseInt(line[9].trim()), // CAR_PRICE
                            line[10].trim(), // CAR_FRONT_URL
                            line[11].trim(), // CAR_AROUND_URL
                            line[12].trim(), // CAR_3D_URL
                            line[13].trim(), // CAR_DESC
                            line[14].trim() // CAR_SUMMARY
                    );

                    records.add(csvVo);
                    log.info("행 {} 매핑 성공: {}", i + 1, csvVo);

                } catch (NumberFormatException e) {
                    log.error("CSV 데이터 형식 오류. 행 번호: {}, 데이터: {}, 오류: {}", i + 1, Arrays.toString(line), e.getMessage());
                } catch (Exception e) {
                    log.error("CSV 데이터 파싱 중 알 수 없는 오류. 행 번호: {}, 데이터: {}, 오류: {}", i + 1, Arrays.toString(line), e.getMessage());
                }
            }

        } catch (CsvException e) {
            log.error("CSV 파일 읽기 중 오류 발생: {}", e.getMessage(), e);
            throw new IOException("CSV 파일 읽기 중 오류 발생", e);
        }

        return records;
    }
}

