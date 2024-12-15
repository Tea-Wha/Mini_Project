package com.kh.miniproject.service;

import com.kh.miniproject.repository.AuthRepository;
import com.kh.miniproject.vo.UserVo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.security.Timestamp;

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

    public String getNickName(String userId) {
        log.info("Repo 에서 가져온 닉네임 값 : {}", authRepository.findNickName(userId));
        return authRepository.findNickName(userId);
    }

    // switch 문을 통해서 key 로 해당하는 유효성검사 비즈니스로직 실행
    public boolean validate(String key, String value) {
        try {
            log.info("키 : {}", key);
            log.info("값 : {}", value);
            switch (key) {
                case "userId":
                    log.info("아이디 유효성 비즈니스 로직{} : ",authRepository.findById(value));
                    return !authRepository.findById(value);
                case "email":
                    log.info("이메일 유효성 비즈니스 로직{} : ",authRepository.findByEmail(value));
                    return !authRepository.findByEmail(value);
                case "nickName":
                    log.info("닉네임 유효성 비즈니스 로직{} : ",authRepository.findByNickName(value));
                    return !authRepository.findByNickName(value);
                case "phoneNum":
                    log.info("전화번호 유효성 비즈니스 로직{} : ",authRepository.findByPhoneNum(value));
                    return !authRepository.findByPhoneNum(value);
                default:
                    log.error("존재 key 값 없음");
                    throw new IllegalArgumentException("존재하는 Key 값이 없습니다.");
            }
        } catch (Exception e) {
            log.error("스위치문 시작 불가");
            // 예외 처리 로직 추가
            throw new RuntimeException("Validation 실패: " + e.getMessage());
        }
    }

    // 아이디 찾기 서비스 계층
    public String findIdByEmail(String email) {
        log.info("서비스에서 repo를 호출 받아 보내는 값 : {}", authRepository.getIdByEmail(email));
        return authRepository.getIdByEmail(email).toString();
    }

    public boolean updatePassword(String userId, String email, String newPassword) {
        log.info("전달받은 userid {}, email {}", userId, email);
        if (authRepository.getPwByIdAndEmail(userId, email)) {
            log.warn("repo 호출 성공");
            // 새 비밀번호 해시화
            String salt = BCrypt.gensalt();
            String hashedPassword = BCrypt.hashpw(newPassword, salt);
            log.info("해시 비번값 : {}", hashedPassword);

            authRepository.updatePassword(userId, hashedPassword);
            log.warn("해시화 성공 및 DB에 입력 완료");
            return true;
        }
        log.warn("아이디 이메일 불일치");
        return false; // 아이디나 이메일이 일치하지 않을 경우
    }
}
