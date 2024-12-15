/* 회원과 관련된 컨트롤러로, 각각 회원가입, 로그인, 회원가입시 유효성 체크, 비밀번호 찾기
*  를 리액트에서 요청받아 서비스 로직, 비즈니스 로직으로 전달 후 서버로 재통신 하는 컨트롤러 */

package com.kh.miniproject.controller;

import com.kh.miniproject.service.AuthService;
import com.kh.miniproject.vo.UserVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

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
    public ResponseEntity<String> signUp(@RequestBody UserVo userVo) {
        try {
            log.info("입력 비밀번호 : {}", userVo.getHashPw());
            log.info("입력 닉네임 : {}", userVo.getNickName());
            log.info("입력 이메일 : {}", userVo.getEmail());
            log.info("입력 아이디 : {}", userVo.getUserId());
            log.info("입력 전화번호 : {}", userVo.getPhoneNum());

            authService.registerUser(userVo);  // 회원가입 처리
            return ResponseEntity.ok("회원가입 성공적으로 완료 하였습니다.");
        } catch (Exception e) {
            log.error("회원가입 실패: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("알 수 없는 오류가 발생했습니다.");
        }
    }
    // 유효성 검사시 URL 을 남기지 않기 위해서 PostMapping 을 사용
    // ID, PW, NickName, Email, PhoneNumber 확인을 위해 key 와 value 값을 가져와서 전달
    @PostMapping("/validate")
    public ResponseEntity<Boolean> validate(@RequestParam String key, @RequestParam String value) {
        boolean isValid = authService.validate(key, value);
        log.error(" isValid = {}",isValid);
        return ResponseEntity.ok(isValid);
        }


    /* 로그인 컨트롤러 RequestBody 로 값을 전달 받아 서비스로 전달 이후 해쉬값을 입혀 DB에 저장 */
    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody UserVo userVo) {
        log.info("아이디 : {}", userVo.getUserId());
        log.info("비밀번호 : {}", userVo.getHashPw());

        // 인증 여부 확인
        boolean isAuthenticated = authService.authenticate(userVo.getUserId(), userVo.getHashPw());
        log.warn("값" + isAuthenticated);

        if (isAuthenticated) {
            // 닉네임 조회
            String nickName = authService.getNickName(userVo.getUserId());
            userVo.setNickName(nickName);
            log.info("닉네임 : {}", nickName);

            // 응답으로 보낼 데이터 준비
            Map<String, String> info = new HashMap<>();
            info.put("userId", userVo.getUserId());
            info.put("nickName", nickName);
            log.info("전달 값 아이디 {}, 전달값 닉네임 {}", userVo.getUserId(), nickName);

            // JSON 형식으로 응답 반환
            return ResponseEntity.ok(info);
        }

        Map<String, String> errorInfo = new HashMap<>();
        errorInfo.put("message", "로그인 실패 하였습니다.");
        return ResponseEntity.status(401).body(errorInfo); // 실패 메시지도 Map 형태로 반환
    }

    @PostMapping("/findId")
    public ResponseEntity<?> findId(@RequestParam("email") String email) {
        // 이메일을 기반으로 ID 검색
        String userId = authService.findIdByEmail(email);
        if (userId != null) {
            return ResponseEntity.ok(Collections.singletonMap("userId", userId));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ID를 찾을 수 없습니다.");
        }
    }
}
