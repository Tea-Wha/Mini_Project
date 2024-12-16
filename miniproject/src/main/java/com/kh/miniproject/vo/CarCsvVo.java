package com.kh.miniproject.vo;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarCsvVo {
    private int carNo;
    private String carName;
    private String classification;
    private Integer manufacturerNo;
    private String engineType;
    private double displacement;
    private double horsePower;
    private double torque;
    private double efficiency;
    private int carPrice;
    private String carFrontUrl; // 상세페이지 용도 45도 또는 정면사진
}