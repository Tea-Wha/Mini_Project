/* 사용자 계정 생성, 로그인에 필요한 정보를 담는 객체 Vo */
package com.kh.miniproject.vo;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserVo {
    private String userId;
    private String hashPw;
    private String nickName;
    private String email;
    private String phoneNum;
}
