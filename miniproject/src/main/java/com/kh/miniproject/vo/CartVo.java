package com.kh.miniproject.vo;

import lombok.*;

@ToString
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CartVo {
	int cartNo;
	String userId;
	int carNo;
	String cartName;
	String cartOption;
	String cartColor;
	int carPrice;
}
