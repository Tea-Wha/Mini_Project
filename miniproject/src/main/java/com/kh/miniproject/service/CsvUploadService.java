package com.kh.miniproject.service;

import com.kh.miniproject.repository.CsvUploadRepository;
import com.kh.miniproject.vo.CarCsvVo;
import com.kh.miniproject.vo.ColorCsvVo;
import com.kh.miniproject.vo.FeatureCsvVo;
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

    // 파싱된 CAR CSV 데이터를 repository 로 전달 후 DB에 저장
    public void processCarCsv(MultipartFile file) throws IOException {
        log.info("차량 파일 업로드 시작: {}", file.getOriginalFilename()); // 파일 이름 출력

        List<CarCsvVo> records = parseCarCsv(file);

        log.info("차량 CSV 파일 파싱 완료, DB 저장 시작");
        csvUploadRepository.saveAllForCar(records);

        log.info("차량 분류 과정 완료: {}", records);  // 파싱 후 저장된 데이터 로그 출력
    }

    // CSV 파일을 파싱하는 메서드
    private List<CarCsvVo> parseCarCsv(MultipartFile file) throws IOException {
        log.info("차량 CSV 파일 파싱 시작: {}", file.getOriginalFilename());
        List<CarCsvVo> records = new ArrayList<>();
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {
            List<String[]> lines = csvReader.readAll();
            if (lines.isEmpty()) {
                log.warn("차량 CSV 파일 내부에 데이터가 없습니다.");
                return records;
            }
            String[] header = lines.get(0);
            if (header.length != 15) {
                log.error("차량 CSV 헤더의 열 수가 올바르지 않습니다. 예상: 열 15 개 중 현재 : {}", header.length);
                throw new IOException("차량 CSV 헤더의 열 수가 올바르지 않습니다.");
            }
            for (int i = 1; i < lines.size(); i++) {
                String[] line = lines.get(i);
                if (line.length != 15) {
                    log.warn("차량 CSV 행의 열 수가 올바르지 않습니다. 행 번호: {}, 데이터 {}", i + 1, Arrays.toString(line));
                    continue; // 행스킵
                }
                try {
                    CarCsvVo carCsvVo = new CarCsvVo(
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

                    records.add(carCsvVo);
                    log.info("차량의 행 {} 매핑 성공: {}", i + 1, carCsvVo);

                } catch (NumberFormatException e) {
                    log.error("차량 CSV 데이터 형식 오류. 행 번호: {}, 데이터: {}, 오류: {}", i + 1, Arrays.toString(line), e.getMessage());
                } catch (Exception e) {
                    log.error("차량 CSV 데이터 파싱 중 알 수 없는 오류. 행 번호: {}, 데이터: {}, 오류: {}", i + 1, Arrays.toString(line), e.getMessage());
                }
            }

        } catch (CsvException e) {
            log.error("차량 CSV 파일 읽기 중 오류 발생: {}", e.getMessage(), e);
            throw new IOException("차량 CSV 파일 읽기 중 오류 발생", e);
        }

        return records;
    }

    // 파싱된 COLOR CSV 데이터를 repository 로 전달 후 DB에 저장
    public void processColorCsv(MultipartFile file) throws IOException {
        log.info("색상 파일 업로드 시작: {}", file.getOriginalFilename()); // 파일 이름 출력

        List<ColorCsvVo> records = parseColorCsv(file);

        log.info("색상 CSV 파일 파싱 완료, DB 저장 시작...");
        csvUploadRepository.saveAllForColor(records);

        log.info("색상 분류 과정 완료: {}", records);  // 파싱 후 저장된 데이터 로그 출력
    }

    // 차량의 색상 CSV 파일 파싱 메서드
    private List<ColorCsvVo> parseColorCsv(MultipartFile file) throws IOException {
        log.info("색상 CSV 파일 파싱 시작: {}", file.getOriginalFilename());
        List<ColorCsvVo> records = new ArrayList<>();
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {
            List<String[]> lines = csvReader.readAll();
            if (lines.isEmpty()) {
                log.warn("색상 CSV 파일 내부에 데이터가 없습니다.");
                return records;
            }
            String[] header = lines.get(0);
            if (header.length != 4) {
                log.error("색상 CSV 헤더의 열 수가 올바르지 않습니다. 예상: 열 4 개 중 현재 : {}", header.length);
                throw new IOException("색상 CSV 헤더의 열 수가 올바르지 않습니다.");
            }
            for (int i = 1; i < lines.size(); i++) {
                String[] line = lines.get(i);
                if (line.length != 4) {
                    log.warn("색상 CSV 행의 열 수가 올바르지 않습니다. 행 번호: {}, 데이터 {}", i + 1, Arrays.toString(line));
                    continue; // 행스킵
                }
                try {
                    ColorCsvVo colorCsvVo = new ColorCsvVo(
                            line[0].trim(), // COLOR_NAME
                            Integer.parseInt(line[1].trim()), // COLOR_PRICE
                            line[2].trim(), // COLOR_URL
                            Integer.parseInt(line[3].trim()) // CAR_NO
                    );
                    records.add(colorCsvVo);
                    log.info("색상의 행 {} 매핑 성공: {}", i + 1, colorCsvVo);

                } catch (NumberFormatException e) {
                    log.error("색상 CSV 데이터 형식 오류. 행 번호: {}, 데이터: {}, 오류: {}", i + 1, Arrays.toString(line), e.getMessage());
                } catch (Exception e) {
                    log.error("색상 CSV 데이터 파싱 중 알 수 없는 오류. 행 번호: {}, 데이터: {}, 오류: {}", i + 1, Arrays.toString(line), e.getMessage());
                }
            }

        } catch (CsvException e) {
            log.error("색상 CSV 파일 읽기 중 오류 발생: {}", e.getMessage(), e);
            throw new IOException("색상 CSV 파일 읽기 중 오류 발생", e);
        }

        return records;
    }

    // 파싱된 FEATURE CSV 데이터를 repository 로 전달 후 DB에 저장
    public void processFeatureCsv(MultipartFile file) throws IOException {
        log.info("옵션 파일 업로드 시작: {}", file.getOriginalFilename()); // 파일 이름 출력

        List<FeatureCsvVo> records = parseFeatureCsv(file);

        log.info("옵션 CSV 파일 파싱 완료, DB 저장 시작...");
        csvUploadRepository.saveAllForFeature(records);

        log.info("옵션 분류 과정 완료: {}", records);  // 파싱 후 저장된 데이터 로그 출력
    }

    // 차량의 옵션 CSV 파일 파싱 메서드
    private List<FeatureCsvVo> parseFeatureCsv(MultipartFile file) throws IOException {
        log.info("옵션 CSV 파일 파싱 시작: {}", file.getOriginalFilename());
        List<FeatureCsvVo> records = new ArrayList<>();
        try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()));
             CSVReader csvReader = new CSVReader(reader)) {
            List<String[]> lines = csvReader.readAll();
            if (lines.isEmpty()) {
                log.warn("옵션 CSV 파일 내부에 데이터가 없습니다.");
                return records;
            }
            String[] header = lines.get(0);
            if (header.length != 7) {
                log.error("옵션 CSV 헤더의 열 수가 올바르지 않습니다. 예상: 열 7 개 중 현재 : {}", header.length);
                throw new IOException("옵션 CSV 헤더의 열 수가 올바르지 않습니다.");
            }
            for (int i = 1; i < lines.size(); i++) {
                String[] line = lines.get(i);
                if (line.length != 7) {
                    log.warn("옵션 CSV 행의 열 수가 올바르지 않습니다. 행 번호: {}, 데이터 {}", i + 1, Arrays.toString(line));
                    continue; // 행스킵
                }
                try {
                    FeatureCsvVo featureCsvVo = new FeatureCsvVo(
                            Integer.parseInt(line[0].trim()), // FEATURE_NO
                            Integer.parseInt(line[1].trim()), // FEATURE_PRICE
                            line[2].trim(), // FEATURE_TYPE
                            line[3].trim(), // FEATURE_VALUE
                            line[4].trim(), // FEATURE_URL
                            Integer.parseInt(line[5].trim()), // CAR_NO
                            line[6].trim() // FEATURE_DESC
                    );
                    records.add(featureCsvVo);
                    log.info("옵션의 행 {} 매핑 성공: {}", i + 1, featureCsvVo);

                } catch (NumberFormatException e) {
                    log.error("옵션 CSV 데이터 형식 오류. 행 번호: {}, 데이터: {}, 오류: {}", i + 1, Arrays.toString(line), e.getMessage());
                } catch (Exception e) {
                    log.error("옵션 CSV 데이터 파싱 중 알 수 없는 오류. 행 번호: {}, 데이터: {}, 오류: {}", i + 1, Arrays.toString(line), e.getMessage());
                }
            }

        } catch (CsvException e) {
            log.error("옵션 CSV 파일 읽기 중 오류 발생: {}", e.getMessage(), e);
            throw new IOException("옵션 CSV 파일 읽기 중 오류 발생", e);
        }

        return records;
    }
}

