package com.kh.miniproject.controller;

import com.kh.miniproject.service.AuthService;
import com.kh.miniproject.vo.UserVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    /* 회원 가입시 URL 을 남기지 않기 위해 PostMapping 을 사용
       RequestBody 로 각각의 값을 전달 받아 서비스로 전달
       후에 값을 가지고와 서버로 전달 */
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

    // 유효성 검사시 URL 을 남기지 않기 위해서 PostMapping 을 사용
    // ID, PW, NickName, Email, PhoneNumber 확인을 위해 key 와 value 값을 가져와서 전달
    @PostMapping("/validate")
    public ResponseEntity<?>validate(@RequestParam String key, @RequestParam String value) {
        boolean isValidated = authService.validate(key, value);
        if (isValidated) {
            return ResponseEntity.ok("사용 가능한 key 입니다.");
        } else {
            return ResponseEntity.badRequest().body("이미 존재하는 value 값 입니다.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String>login(@RequestBody UserVo userVo) {
        log.info("아이디 : {}", userVo.getUserId());
        log.info("비밀번호 : {}", userVo.getHashPw());
        boolean isAuthenticated = authService.authenticate(userVo.getUserId(), userVo.getHashPw());
        log.warn("값" + isAuthenticated);
        if (isAuthenticated) {
            return ResponseEntity.ok("로그인 성공적으로 완료 하였습니다.");
        }
        return ResponseEntity.status(401).body("로그인 실패 하였습니다.");
    }
}
