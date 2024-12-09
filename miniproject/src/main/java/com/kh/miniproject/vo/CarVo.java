/* 차량 상세정보 및 견적시 기본옵션 항목 보여주기 위한 Vo */
package com.kh.miniproject.vo;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CarVo {
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
    private String carAroundUrl;    // 견적페이지 용도 360도 회전하는 사진 url
    private String car3dUrl;    // 360도 회전하는 용도 url
    private String carDesc;
    private String summary;
    private String manufacturerName;
    private String manufacturerUrl;
}