/* 정렬 메인페이지에서 차량 정렬을 위한 객체를 담는 VO */
package com.kh.miniproject.vo;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CategoryVo {
    private int carNo;
    private String carName;
    private String manufacturer;
    private Integer price;
    private Integer minPrice;
    private Integer maxPrice;
    private String engineType;
    private String classification;
    private String manufacturerUrl;
    private String carFrontUrl;
}
