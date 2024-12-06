/* 차량 상세정보 및 견적시 기본옵션 항목 보여주기 위한 Vo */
package com.kh.miniproject.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarVo {
    private int carNum;
    private String carName;
    private String classification;
    private String engineType;
    private double displacement;
    private int horsePower;
    private double torque;
    private double efficiency;
    private int price;
    private String carUrl;
    private String carDesc;
    private String summary;
    private String manufacturerName;
    private String manufacturerUrl;
}