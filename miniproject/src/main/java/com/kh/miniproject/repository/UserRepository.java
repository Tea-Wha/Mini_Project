package com.kh.miniproject.repository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
@Slf4j
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    private static final String CREATE_ACCOUNT = "INSERT INTO USERS (USER_ID, USER_PW, NICKNAME, EMAIL, PHONE) VALUES (?, ?, ?, ?, ?)";
    private static final String LOG_IN = "SELECT USER_ID, NICKNAME FROM USERS WHERE USER_ID = ? AND USER_PW = ? ";
}
