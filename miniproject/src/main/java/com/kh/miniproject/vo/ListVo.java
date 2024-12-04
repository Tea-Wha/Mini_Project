/* 정렬 메인페이지에서 차량 정렬을 위한 객체를 담는 VO */
package com.kh.miniproject.vo;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@RequiredArgsConstructor
public class ListVo {
    private String carName;
    private String manufacturer;
    private int price;
    private int minPrice;
    private int maxPrice;
    private String engineType;
    private String classification;
}
