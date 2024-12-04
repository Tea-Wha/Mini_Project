package com.kh.miniproject.vo;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ManufacturerVo {
    private String manufacturerName;
    private String url;

    public ManufacturerVo(String companyName, String imageUrl) {
    }
}