package com.kh.miniproject.repository;
import com.kh.miniproject.vo.UserVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class AuthRepository {
    private final JdbcTemplate jdbcTemplate;

    private static final String INSERT_USER = "INSERT INTO USERS (USER_ID, HASH_PW, NICKNAME, EMAIL, PHONE) VALUES (?, ?, ?, ?, ?)";
    private static final String LOG_IN = "SELECT HASH_PW FROM USERS WHERE USER_ID = ?";


    public void registerAccount(UserVo userVo) {
        try {
            jdbcTemplate.update(INSERT_USER, userVo.getUserId(), userVo.getHashPw(), userVo.getNickName(), userVo.getEmail(), userVo.getPhoneNum());
            log.info("아이디 {}",userVo.getUserId());
        } catch (Exception e) {
            log.error("계정 생성 중 오류 발생: {}", e.getMessage());
        }


    }

    public String findHashPassByUserId(String userId) {
        try {
            return jdbcTemplate.queryForObject(LOG_IN, String.class, userId);
        } catch (Exception e) {
            log.warn("아이디 {}에 대한 비밀번호를 찾을 수 없습니다. 에러: {}", userId, e.getMessage());
            return null;
        }
    }
}
