package com.kh.miniproject.service;

import com.kh.miniproject.repository.CartRepository;
import com.kh.miniproject.vo.CartVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class CartService {
	
	@Autowired
	private CartRepository cartRepository;
	
	public List<CartVo> getCarts(String userId) {
		List<CartVo> cart = cartRepository.getCart(userId);
		log.warn("getCarts : {}", cart);
		return cart;
	}
	public Boolean createCart(CartVo cartVo) {
		Boolean isSuccess = cartRepository.createCart(cartVo);
		log.warn("생성 성공 : {}",isSuccess);
		return isSuccess;
	}
	public Boolean deleteCart(int cartNo) {
		Boolean isSuccess = cartRepository.deleteCart(cartNo);
		log.warn("삭제 성공 : {}",isSuccess);
		return isSuccess;
	}
	public Boolean updateCart(CartVo cartVo) {
		Boolean isSuccess = cartRepository.updateCart(cartVo);
		log.warn("수정 성공 : {}",isSuccess);
		return isSuccess;
	}
	public Boolean nameChange(String cartName, int cartNo) {
		Boolean isSuccess = cartRepository.nameChange(cartName, cartNo);
		log.warn("이름변경 성공 : {}",isSuccess);
		return isSuccess;
	}
}
