// RESTful API를 통해 서버와 통신을 하며 로그인과 회원가입에 필요한 정보를 주고 받음

import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

// 사용자에게 입력 받은 id, pw 값을 서버로 전달, 서버에서 전달 받은후 비즈니스 로직을 거치고 DB와 값을 비교후에 결과 값을 전달 받음
const AxiosApi = {
  login: async (id, pw) => {
    console.log("아이디: ", id);
    console.log("비밀번호: ", pw);
    const UserVo = {
      userId: id,
      hashPw: pw,
    };
    return await axios.post(KH_DOMAIN + "/auth/login", UserVo);
  },

  join: async (id, pw, nName, eMail, telNum) => {
    console.log("아이디: ", id);
    console.log("비밀번호: ", pw);
    console.log("닉네임: ", nName);
    console.log("이메일: ", eMail);
    console.log("전화번호: ", telNum);

    // 회원가입시 필요한 어플리케이션 구간에서 입력 받은 값을 서버로 전달
    const UserVo = {
      userId: id,
      hashPw: pw,
      nickName: nName,
      email: eMail,
      phoneNum: telNum,
    };
    return await axios.post(KH_DOMAIN + "/auth/join", UserVo);
  },

  validate: async (key, value) => {
    const response = await axios.post(`${KH_DOMAIN}/auth/validate`, null, {
      params: { key, value },
    });
    return response;
  },

  findId: async (email) => {
    const response = await axios.post(`${KH_DOMAIN}/auth/findId`, null, {
      params: { email },
    });
    return response;
  },

  findPw: async (userId, email, newPassword) => {
    const response = await axios.post(`${KH_DOMAIN}/auth/findPassword`, null, {
      params: { userId, email, newPassword },
    });
    return response.data;
  },
};

export default AxiosApi;
