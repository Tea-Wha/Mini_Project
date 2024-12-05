package com.kh.miniproject.controller;

import com.kh.miniproject.service.AuthService;
import com.kh.miniproject.vo.UserVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<String>login(@RequestBody UserVo userVo) {
        log.info("아이디 : {}", userVo.getUserId());
        log.info("비밀번호 : {}", userVo.getHashPw());
        boolean isAuthenticated = authService.authenticate(userVo.getUserId(), userVo.getHashPw());
        if (isAuthenticated) {
            return ResponseEntity.ok("로그인 성공적으로 완료 하였습니다.");
        }
        return ResponseEntity.status(401).body("로그인 실패 하였습니다.");
    }

    @PostMapping("/join")
    public ResponseEntity<String>signUp(@RequestBody UserVo userVo) {
        log.info("입력 아이디 : {}", userVo.getUserId());
        log.info("입력 비밀번호 : {}", userVo.getHashPw());
        log.info("입력 닉네임 : {}", userVo.getNickName());
        log.info("입력 이메일 : {}", userVo.getEmail());
        log.info("입력 전화번호 : {}", userVo.getPhoneNum());
        authService.registerUser(userVo);
        return ResponseEntity.ok("회원가입 성공적으로 완료 하였습니다.");
    }

}
