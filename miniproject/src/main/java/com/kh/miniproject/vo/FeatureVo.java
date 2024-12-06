/* 차량 상세정보 및 견적시 편의 옵션 항목 보여주기 위한 Vo */
package com.kh.miniproject.vo;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeatureVo {
    private String featureType;
    private String featureValue;
    private int featurePrice;
    private String featureUrl;
    private String featureDesc;
}
