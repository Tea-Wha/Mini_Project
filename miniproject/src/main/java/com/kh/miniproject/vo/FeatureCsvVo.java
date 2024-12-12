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
    private String featureUrl;
    private int carNo;
    private String featureDesc;
}
