package com.kh.miniproject.service;

import com.kh.miniproject.repository.AuthRepository;
import com.kh.miniproject.vo.UserVo;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class AuthService {
    private final AuthRepository authRepository;

    // UserVo의 회원가입시 정보 객체를 초기화하는 메서드 : 비밀번호는 해쉬처리한 값을 초기화한다.
    public void registerUser(String userId, String userPw, String nickName, String email, String phoneNum) {
        String hashedPw = BCrypt.hashpw(userPw, BCrypt.gensalt());
        UserVo userVo = new UserVo();
        userVo.setUserId(userId);
        userVo.setHashPw(hashedPw);
        userVo.setNickName(nickName);
        userVo.setEmail(email);
        userVo.setPhoneNum(phoneNum);
        authRepository.registerAccount(userVo);
    }

    // UserVo의 Id와 전달 받은 해쉬 Pw 값을 비교하는 비즈니스 로직.
    public boolean authenticate(String userId, String userPw) {
        String existHash = authRepository.findHashPassByUserId(userId);

        // Repository 의 DB에 저장되어 있는 값이 Null 이라면
        if (existHash == null) {
            return false;
        }
        return BCrypt.checkpw(userPw, existHash);
    }
}
