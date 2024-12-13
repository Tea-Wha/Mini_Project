package com.kh.miniproject.repository;

import com.kh.miniproject.vo.CarVo;
import com.kh.miniproject.vo.CartVo;
import com.kh.miniproject.vo.ListVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Repository
public class CartRepository {
	
	private final JdbcTemplate jdbcTemplate;
	
	private final static String GET_CART = "SELECT C1.CARNO, C2.CAR_PRICE, C1.USER_ID, C1.CART_NO, C1.CART_NAME, C1.CART_OPTIONS, C1.CART_COLOR FROM CARTS C1 JOIN CARS C2 ON C1.CAR_NO = C2.CAR_NO WHERE USER_ID = ?";
	private final static String NUM_CART = "SELECT COUNT(*) FROM CARTS WHERE USER_ID = ?";
	private final static String CREATE_CART = "INSERT INTO CARTS(USER_ID, CAR_NO, CAR_COLOR, CAR_OPITONS) VALUES(?,?,?,?,?)";
	private final static String NAME_CHANGE = "UPDATE CARTS SET CART_NAME = ? WHERE CART_NO = ?";
	private final static String UPDATE_CART = "UPDATE CARTS SET CART_OPTIONS = ?, CART_COLOR = ? WHERE CART_NO = ?" ;
	private final static String DELETE_CART = "UPDATE CARTS SET USERID = 'DELETE' WHERE CART_NO = ? "; // 쓰레기통용 계정 생성
	
	public List<CartVo> getCart(String userId) {
		List<CartVo> cartList = jdbcTemplate.query(GET_CART, new CartRowMapper(), userId);
		log.warn("카트 목록 : {}", cartList);
		return cartList;
	}
	
	public boolean numOfCart(String userId) {
		int numOfCart = jdbcTemplate.queryForObject(NUM_CART, Integer.class, userId);
		log.warn("{}의 카트의 개수 : {}", userId, numOfCart);
		return numOfCart < 4;
	}
	
	public boolean createCart(CartVo cartVo) {
		log.warn("추가하려는 카트 {}", cartVo);
		int isSuccess = jdbcTemplate.queryForObject(CREATE_CART, Integer.class, cartVo.getUserId(), cartVo.getCartNo(), cartVo.getCartColor(), cartVo.getCartOption());
		log.info("추가된 열 : {}", isSuccess);
		return isSuccess > 0;
	}
	
	public boolean nameChange(String name, int cartNo) {
		log.warn("바꾸는 카트번호 : {}, 바꿀 이름 : {}", cartNo, name);
		int isSuccess = jdbcTemplate.queryForObject(NAME_CHANGE, Integer.class, name, cartNo);
		return isSuccess > 0;
	}
	
	public boolean updateCart(CartVo cartVo) {
		log.warn("수정하려는 카트 {}", cartVo);
		int isSuccess = jdbcTemplate.queryForObject(UPDATE_CART, Integer.class, cartVo.getCartColor(), cartVo.getCartOption(), cartVo.getCartColor(), cartVo.getCartNo());
		log.info("변경된 내역 : {}", isSuccess);
		return isSuccess > 0;
	}
	
	public boolean deleteCart(int cartNo) {
		log.warn("삭제하려는 카트의 카트번호 : {}", cartNo);
		int isSuccess = jdbcTemplate.queryForObject(DELETE_CART, Integer.class, cartNo);
		log.info("삭제된 내역 : {}", isSuccess);
		return isSuccess > 0;
	}
	
	
	
	private static class CartRowMapper implements RowMapper<CartVo> {
		@Override
		public CartVo mapRow(ResultSet rs, int rowNum) throws SQLException {
			return new CartVo(rs.getInt("CART_NO"), rs.getString("USERID"), rs.getInt("CAR_NO"), rs.getString("CART_NAME"), rs.getString("CART_OPTIONS"), rs.getString("CART_COLOR"), rs.getInt("CAR_PRICE"));
		}
	}
}
