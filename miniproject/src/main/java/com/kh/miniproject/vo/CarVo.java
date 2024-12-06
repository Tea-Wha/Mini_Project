/* 차량 상세 정보를 담기 위한 객체 Vo */
package com.kh.miniproject.vo;
import lombok.*;

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
    private int power;
    private double torque;
    private double efficiency;
    private int price;
    private String carDesc;
    private String summary;


}