package com.kh.miniproject.vo;


import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class BrandCarVo {
	private int carNo;
	private String carName;
	private String carUrl;
	private int carPrice;
}
