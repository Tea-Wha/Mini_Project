import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/Authentication";

const Join = () => {
  const navigator = useNavigate;
  // 입력 받은 input 값
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhoneNum, setInputPhoneNum] = useState("");

  // 입력시 에러표시 출력에 필요
  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [conPwError, setConPwError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumError, setPhoneNumError] = useState("");

  // 정규식 유효성 검사때 필요한 true/false 값
  const [idCheck, setIdCheck] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [conPwCheck, setConPwCheck] = useState("");
  const [nickNameCheck, setNickNameCheck] = useState("");
  const [emailCheck, setEmailCheck] = useState("");
  const [phoneNumCheck, setPhoneNumCheck] = useState("");

  // 정규식 표현법을 좀 더 세분화 하는 작업 필요
  // 예를들면 id 에 특수문자가 들어갔을때 걸러내는 if문과
  // 글자가 초과했을때 걸러내는 if문 등등 (즉 세부 메세지를 출력함)
  const onChangeId = (e) => {
    setInputId(e.target.value);
    const idFormat = /^[a-zA-Z0-9]([._]?[a-zA-Z0-9]+)*$/;
    if (!idFormat.test(e.target.value)) {
      idError("올바르지 않는 아이디 형식입니다.");
      idCheck(false);
    } else {
      idError("사용 가능한 아이디 입니다.");
      idCheck(true);
    }
  };

  const onChangePw = (e) => {
    setInputPw(e.target.value);
    const pwFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pwFormat.test(e.target.value)) {
      pwError("올바르지 않는 비밀번호 형식입니다.");
      pwCheck(false);
    } else {
      pwError("사용 가능한 비밀번호 입니다.");
      pwCheck(true);
    }
  };

  const onChangeConPw = (e) => {
    const currentPw = e.target.value;
    setInputConPw(currentPw);
    if (setInputConPw !== inputPw) {
      conPwError("비밀번호와 일치하지 않습니다.");
      conPwCheck(false);
    } else {
      conPwError("비밀번호와 일치 합니다.");
      conPwCheck(true);
    }
  };

  const onChangeNickName = (e) => {
    setInputNickName(e.target.value);
    const nickNameFormat = /^[가-힣]{2,10}$/;
    if (!nickNameFormat.test(e.target.value)) {
      nickNameError("올바르지 않는 닉네임 형식입니다.");
      nickNameCheck(false);
    } else {
      nickNameError("사용 가능한 닉네임 입니다.");
      nickNameCheck(true);
    }
  };

  const onChangeEmail = (e) => {
    setInputEmail(e.target.value);
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailFormat.test(e.target.value)) {
      emailError("올바르지 않는 이메일 형식입니다.");
      emailCheck(false);
    } else {
      emailError("사용 가능한 이메일 입니다.");
      emailCheck(true);
    }
  };

  const onChangePhoneNum = (e) => {
    setInputPhoneNum(e.target.value);
    const phoneNumFormat = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/;
    if (!phoneNumFormat.test(e.target.value)) {
      phoneNumError("올바르지 않는 전화번호 형식입니다.");
      phoneNumCheck(false);
    } else {
      phoneNumError("사용 가능한 전화번호 입니다.");
      emailCheck(true);
    }
  };

  // 서버를 통해 DB내에 있는 아이디가 이미 있는지 여부 체크
  const idValidate = async (id) => {
    try {
      const rsp = await AxiosApi.idValidate(id);
      console.log("유효성 검사 결과 값 : ", rsp.data);
      if (rsp.date === true) {
        // 백엔드 에서 true 값을 전달할때 즉, 중복된 사용자가 없을때
        setIdError("사용 가능한 아이디 입니다."); // 사용 가능한 아이디 출력
        setIdCheck(true); // true 반환
      } else {
        // 백엔드에서 유효성 검사 후에 중복된 값이 있을때 false를 전달
        setIdError("이미 사용중인 아이디 입니다.");
        setIdCheck(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 서버를 통해 DB내에 있는 이메일이 이미 있는지 여부 체크
  const emailValidate = async (email) => {
    try {
      const rsp = await AxiosApi.emailValidate(email);
      console.log("유효성 검사 결과 값", rsp.data);
      if (rsp === true) {
        // 백엔드에서 유효성 검사 후에 중복된 값이 없을때 true를 전달
        setIdError("사용 가능한 이메일 입니다.");
        setIdCheck(true); // true 반환
      } else {
        // 백엔드에서 유효성 검사 후에 중복된 값이 있을때 false를 전달
        setIdError("이미 사용중인 이메일 입니다.");
        setIdCheck(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 서버를 통해 DB내에 있는 닉네임이 이미 있는지 여부 체크
  const nickNameValidate = async (nickName) => {
    try {
      const rsp = await AxiosApi.emailValidate(nickName);
      console.log("유효성 검사 결과 값", rsp.data);
      if (rsp === true) {
        // 백엔드에서 유효성 검사 후에 중복된 값이 없을때 true를 전달
        setNickNameError("사용 가능한 닉네임 입니다.");
        setNickNameCheck(true); // true 반환
      } else {
        // 백엔드에서 유효성 검사 후에 중복된 값이 있을때 false를 전달
        setNickNameError("이미 사용중인 닉네임 입니다.");
        setIdCheck(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // 서버를 통해 DB내에 있는 전화번호가 이미 있는지 여부 체크
  const phoneNumValidate = async (phoneNum) => {
    try {
      const rsp = await AxiosApi.phoneNumValidate(phoneNum);
      console.log("유효성 검사 결과 값", rsp.data);
      if (rsp === true) {
        // 백엔드에서 유효성 검사 후에 중복된 값이 없을때 true를 전달
        setPhoneNumError("사용 가능한 전화번호 입니다.");
        setPhoneNumCheck(true); // true 반환
      } else {
        setPhoneNumError("이미 사용중인 전화번호 입니다.");
        setPhoneNumCheck(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 회원가입 버튼 함수
  const onClickSignUp = async () => {
    try {
      const signUp = await AxiosApi.join(inputId, inputPw, inputNickName, inputEmail, inputPhoneNum);
      console.log(signUp.data);
      if (signUp.data) {
        navigator("/");
      } else {
        alert("회원가입에 실패 하였습니다.");
      }
    } catch (e) {
      alert("서버가 응답하지 않습니다.");
    }
  };

  return <div></div>;
};

export default Join;
