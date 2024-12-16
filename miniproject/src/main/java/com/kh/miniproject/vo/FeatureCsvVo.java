package com.kh.miniproject.vo;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeatureCsvVo {
    private int featureNo;
    private int featurePrice;
    private String featureType;
    private String featureValue;
    private int carNo;
}
