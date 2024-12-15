/* 차량 견적후에 서버로부터 객체를 전달받아 카트에 담는 컨트롤러 */
package com.kh.miniproject.controller;


import com.kh.miniproject.service.CartService;
import com.kh.miniproject.vo.CartVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/cart")
public class CartController {
	@Autowired
	private CartService cartService;
	
	@GetMapping("/getCart/{userId}")
	public List<CartVo> getCart(@PathVariable("userId") String userId) {
		return cartService.getCarts(userId);
	}
	
	@PostMapping("/createCart")
	public boolean createCart(@RequestBody CartVo cartVo) {
		return cartService.createCart(cartVo);
	}
	
	@PostMapping("/deleteCart/{cartNo}")
	public boolean deleteCart(@PathVariable("cartNo") int cartNo) {
		return cartService.deleteCart(cartNo);
	}
	
	@PostMapping("/updateCart")
	public boolean updateCart(@RequestBody CartVo cartVo) {
		return cartService.updateCart(cartVo);
	}
	@PostMapping("/nameChange")
	public boolean nameChange(@RequestBody CartVo cartVo ) {
		return cartService.nameChange(cartVo.getCartName(), cartVo.getCartNo());
	}
}
