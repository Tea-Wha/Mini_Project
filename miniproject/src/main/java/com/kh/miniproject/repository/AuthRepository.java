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
    private static final String VALIDATE_ID = "SELECT COUNT(*) FROM USERS WHERE USER_ID = ?";
    private static final String VALIDATE_NICKNAME = "SELECT COUNT(*) FROM USERS WHERE NICKNAME = ?";
    private static final String VALIDATE_EMAIL = "SELECT COUNT(*) FROM USERS WHERE EMAIL = ?";
    private static final String VALIDATE_PHONE = "SELECT COUNT(*) FROM USERS WHERE PHONE = ?";

    // 회원가입 쿼리문을 날려 DB에 정보를 입력
    public void registerAccount(UserVo userVo) {
        try {
            jdbcTemplate.update(INSERT_USER, userVo.getUserId(), userVo.getHashPw(), userVo.getNickName(), userVo.getEmail(), userVo.getPhoneNum());
            log.info("아이디 {}",userVo.getUserId());
        } catch (Exception e) {
            log.error("계정 생성 중 오류 발생: {}", e.getMessage());
        }
    }

    // HashPass 와 ID를 비교해 로그인을 돕는 메서드
    public String findHashPassByUserId(String userId) {
        try {
            return jdbcTemplate.queryForObject(LOG_IN, String.class, userId);
        } catch (Exception e) {
            log.warn("아이디 {}에 대한 비밀번호를 찾을 수 없습니다. 에러: {}", userId, e.getMessage());
            return null;
        }
    }

    // ID로 유저 존재 여부 확인
    public boolean findById(String id) {
        Integer count = jdbcTemplate.queryForObject(VALIDATE_ID, Integer.class, id);
        return count != null && count > 0;
    }

    // 이메일로 유저 존재 여부 확인
    public boolean findByEmail(String email) {
        Integer count = jdbcTemplate.queryForObject(VALIDATE_EMAIL, Integer.class, email);
        return count != null && count > 0;
    }

    // 닉네임으로 유저 존재 여부 확인
    public boolean findByNickName(String nickname) {
        Integer count = jdbcTemplate.queryForObject(VALIDATE_NICKNAME, Integer.class, nickname);
        return count != null && count > 0;
    }

    // 전화번호로 유저 존재 여부 확인
    public boolean findByPhoneNum(String phoneNum) {
        Integer count = jdbcTemplate.queryForObject(VALIDATE_PHONE, Integer.class, phoneNum);
        return count != null && count > 0;
    }
}
