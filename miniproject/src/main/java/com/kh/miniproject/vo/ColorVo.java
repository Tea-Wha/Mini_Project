/* 차량 상세정보 및 견적시 색상 항목 보여주기 위한 Vo */
package com.kh.miniproject.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ColorVo {
    private String colorName;
    private int colorPrice;
    private String colorUrl;
    private String carUrl;
}
