package com.kh.miniproject.service;

import com.kh.miniproject.repository.AuthRepository;
import com.kh.miniproject.vo.UserVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
@Slf4j
public class AuthService {
    private final AuthRepository authRepository;

    // UserVo의 회원가입시 정보 객체를 초기화하는 메서드 : 비밀번호는 해쉬처리한 값을 초기화한다.
    public void registerUser(UserVo userVo) {
        String hashedPw = BCrypt.hashpw(userVo.getHashPw(), BCrypt.gensalt());
        userVo.setHashPw(hashedPw);
        log.info("저장된 해쉬값 {}", hashedPw);
        authRepository.registerAccount(userVo);
    }

    // UserVo의 Id와 전달 받은 해쉬 Pw 값을 비교하는 비즈니스 로직.
    public boolean authenticate(String userId, String userPw) {
        String existHash = authRepository.findHashPassByUserId(userId);

        // Repository 의 DB에 저장되어 있는 값이 없으면 예외처리
        if (existHash == null) {
            throw new IllegalArgumentException("존재하지 않는 ID");
        }
        return BCrypt.checkpw(userPw, existHash);
    }

    // Email 인증 API 필요
}
