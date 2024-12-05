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

    private static final String CREATE_ACCOUNT = "INSERT INTO USERS (USER_ID, HASH_PW, NICKNAME, EMAIL, PHONE) VALUES (?, ?, ?, ?, ?)";
    private static final String LOG_IN = "SELECT HASH_PW FROM USERS WHERE USER_ID = ?";


    public void registerAccount(UserVo userVo) {
        jdbcTemplate.update(CREATE_ACCOUNT, userVo.getUserId(), userVo.getHashPw(), userVo.getNickName(), userVo.getEmail(), userVo.getPhoneNum());
        log.info("아이디 {}",userVo.getUserId());

    }

    public String findHashPassByUserId(String userId) {
        try {
            return jdbcTemplate.queryForObject(LOG_IN, String.class, userId);
        } catch (Exception e) {
            return null;
        }
    }
}
