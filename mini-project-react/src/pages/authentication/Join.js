import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosApi from "../../api/Authentication";
import { Container, Items, Input, Button } from "../../components/JoinComponent";

const Join = () => {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputConPw, setInputConPw] = useState("");
  const [inputNickName, setInputNickName] = useState("");
  const [inputEmail, setInputEmail] = useState("");
  const [inputPhoneNum, setInputPhoneNum] = useState("");

  const [idError, setIdError] = useState("");
  const [pwError, setPwError] = useState("");
  const [conPwError, setConPwError] = useState("");
  const [nickNameError, setNickNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneNumError, setPhoneNumError] = useState("");

  const [idCheck, setIdCheck] = useState(false);
  const [pwCheck, setPwCheck] = useState(false);
  const [conPwCheck, setConPwCheck] = useState(false);
  const [nickNameCheck, setNickNameCheck] = useState(false);
  const [emailCheck, setEmailCheck] = useState(false);
  const [phoneNumCheck, setPhoneNumCheck] = useState(false);

  const onChangeId = (e) => {
    const idValue = e.target.value;
    setInputId(idValue);

    const idFormat = /^[a-zA-Z0-9]([._]?[a-zA-Z0-9]+)*$/;
    if (!idFormat.test(idValue)) {
      setIdError("올바르지 않는 아이디 형식입니다.");
      setIdCheck(false);
    } else {
      setIdError("사용 가능한 아이디 입니다.");
      setIdCheck(true);
      idValidate(idValue);
    }
  };

  const onChangePw = (e) => {
    const pwValue = e.target.value;
    setInputPw(pwValue);
    const pwFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!pwFormat.test(pwValue)) {
      setPwError("올바르지 않는 비밀번호 형식입니다.");
      setPwCheck(false);
    } else {
      setPwError("사용 가능한 비밀번호 입니다.");
      setPwCheck(true);
    }
  };

  const onChangeConPw = (e) => {
    const conPwValue = e.target.value;
    setInputConPw(conPwValue);
    if (conPwValue !== inputPw) {
      setConPwError("비밀번호와 일치하지 않습니다.");
      setConPwCheck(false);
    } else {
      setConPwError("비밀번호와 일치합니다.");
      setConPwCheck(true);
    }
  };

  const onChangeNickName = (e) => {
    const nickNameValue = e.target.value;
    setInputNickName(nickNameValue);
    const nickNameFormat = /^[가-힣]{2,10}$/;
    if (!nickNameFormat.test(nickNameValue)) {
      setNickNameError("올바르지 않는 닉네임 형식입니다.");
      setNickNameCheck(false);
    } else {
      setNickNameError("사용 가능한 닉네임 입니다.");
      setNickNameCheck(true);
      nickNameValidate(nickNameValue);
    }
  };

  const onChangeEmail = (e) => {
    const emailValue = e.target.value;
    setInputEmail(emailValue);
    const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailFormat.test(emailValue)) {
      setEmailError("올바르지 않는 이메일 형식입니다.");
      setEmailCheck(false);
    } else {
      setEmailError("사용 가능한 이메일 입니다.");
      setEmailCheck(true);
      emailValidate(emailValue);
    }
  };

  const onChangePhoneNum = (e) => {
    const phoneValue = e.target.value;
    setInputPhoneNum(phoneValue);
    const phoneNumFormat = /^(010|011|016|017|018|019)-\d{3,4}-\d{4}$/;
    if (!phoneNumFormat.test(phoneValue)) {
      setPhoneNumError("올바르지 않는 전화번호 형식입니다.");
      setPhoneNumCheck(false);
    } else {
      setPhoneNumError("사용 가능한 전화번호 입니다.");
      setPhoneNumCheck(true);
      phoneNumValidate(phoneValue);
    }
  };

  const idValidate = async (id) => {
    try {
      const rsp = await AxiosApi.validate("userId", id);
      if (rsp.data === true) {
        // .data는 서버나 컴포넌트 부분 한쪽만 해줘야 함. 주로 컴포넌트 부분에서 해주는게 맞음
        setIdError("사용 가능한 아이디 입니다.");
        setIdCheck(true);
      } else {
        setIdError("이미 사용중인 아이디 입니다.");
        setIdCheck(false);
      }
    } catch (error) {
      console.error("아이디 유효성 검사 실패", error);
    }
  };

  const nickNameValidate = async (nickName) => {
    try {
      const rsp = await AxiosApi.validate("nickName", nickName);
      console.log(rsp.data);
      if (rsp.data === true) {
        setNickNameError("사용 가능한 닉네임 입니다.");
        setNickNameCheck(true);
      } else {
        setNickNameError("이미 사용중인 닉네임 입니다.");
        setNickNameCheck(false);
      }
    } catch (error) {
      console.error("닉네임 유효성 검사 실패", error);
    }
  };

  const emailValidate = async (email) => {
    try {
      const rsp = await AxiosApi.validate("email", email);
      console.log(rsp.data);
      if (rsp.data === true) {
        setEmailError("사용 가능한 이메일 입니다.");
        setEmailCheck(true);
      } else {
        setEmailError("이미 사용중인 이메일 입니다.");
        setEmailCheck(false);
      }
    } catch (error) {
      console.error("이메일 유효성 검사 실패", error);
    }
  };

  const phoneNumValidate = async (phoneNum) => {
    try {
      const rsp = await AxiosApi.validate("phoneNum", phoneNum);
      if (rsp.data === true) {
        setPhoneNumError("사용 가능한 전화번호 입니다.");
        setPhoneNumCheck(true);
      } else {
        setPhoneNumError("이미 사용중인 전화번호 입니다.");
        setPhoneNumCheck(false);
      }
    } catch (error) {
      console.error("전화번호 유효성 검사 실패", error);
    }
  };

  const onClickSignUp = async () => {
    if (!idCheck || !pwCheck || !conPwCheck || !nickNameCheck || !emailCheck || !phoneNumCheck) {
      alert("모든 항목을 올바르게 입력해주세요.");
      return;
    }

    try {
      const signUp = await AxiosApi.join(inputId, inputPw, inputNickName, inputEmail, inputPhoneNum);
      if (signUp.data) {
        alert("회원가입에 성공하였습니다.");
        navigate("/");
      } else {
        alert("회원가입에 실패하였습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error("회원가입 오류:", error);
    }
  };

  return (
    <Container>
      {/* 아이디 입력 */}
      <Items variant="item2">
        <Input type="text" placeholder="아이디" value={inputId} onChange={onChangeId} />
      </Items>
      <Items variant="hint">{inputId.length > 0 && <span className={`message ${idCheck ? "success" : "error"}`}>{idError}</span>}</Items>

      {/* 패스워드 입력 */}
      <Items variant="item2">
        <Input type="password" placeholder="패스워드" value={inputPw} onChange={onChangePw} />
      </Items>
      <Items variant="hint">{inputPw.length > 0 && <span className={`message ${pwCheck ? "success" : "error"}`}>{pwError}</span>}</Items>

      {/* 패스워드 확인 입력 */}
      <Items variant="item2">
        <Input type="password" placeholder="패스워드 확인" value={inputConPw} onChange={onChangeConPw} />
      </Items>
      <Items variant="hint">{inputConPw.length > 0 && <span className={`message ${conPwCheck ? "success" : "error"}`}>{conPwError}</span>}</Items>

      {/* 닉네임 입력 */}
      <Items variant="item2">
        <Input type="text" placeholder="닉네임" value={inputNickName} onChange={onChangeNickName} />
      </Items>
      <Items variant="hint">{inputNickName.length > 0 && <span className={`message ${nickNameCheck ? "success" : "error"}`}>{nickNameError}</span>}</Items>

      {/* 이메일 입력 */}
      <Items variant="item2">
        <Input type="email" placeholder="이메일" value={inputEmail} onChange={onChangeEmail} />
      </Items>
      <Items variant="hint">{inputEmail.length > 0 && <span className={`message ${emailCheck ? "success" : "error"}`}>{emailError}</span>}</Items>

      {/* 전화번호 입력 */}
      <Items variant="item2">
        <Input type="tel" placeholder="전화번호" value={inputPhoneNum} onChange={onChangePhoneNum} />
      </Items>
      <Items variant="hint">{inputPhoneNum.length > 0 && <span className={`message ${phoneNumCheck ? "success" : "error"}`}>{phoneNumError}</span>}</Items>

      {/* 회원가입 버튼 */}
      <Items variant="item2">
        <Button disabled={!(idCheck && pwCheck && conPwCheck && nickNameCheck && emailCheck && phoneNumCheck)} onClick={onClickSignUp}>
          NEXT
        </Button>
      </Items>
    </Container>
  );
};

export default Join;
