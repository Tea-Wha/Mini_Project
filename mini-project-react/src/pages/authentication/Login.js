import React, { useContext, useState } from "react";
import AxiosApi from "../../api/Authentication";
// import { Button, Container, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserStore";
import {
  StyledContainer,
  StyledInput,
  StyledButton,
  ImageContainer,
  InputContainer,
  Footer,
  StyledH1,
  StyledH3,
} from "../../styles/authentication/Login.js";

const image = "/login/login.jpg";

const Login = () => {
  const navigate = useNavigate();
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [isId, setisId] = useState(false);
  const [isPw, setisPw] = useState(false);

  const { updateUserId, updateNickName } = useContext(UserContext);

  const handleInputChange = (e, setState, setValidState) => {
    setState(e.target.value);
    setValidState(e.target.value.length >= 4);
  };

  const onClickLogin = async () => {
    try {
      const rsp = await AxiosApi.login(inputId, inputPw);
      console.log(rsp.data);

      if (rsp.status === 200) {
        const { nickName, userId } = rsp.data;

        // 함수 호출 확인
        console.log("Calling updateUserId with:", userId);
        console.log("Calling updateNickName with:", nickName);

        updateUserId(userId);
        updateNickName(nickName);

        navigate("/"); // 페이지 이동
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (e) {
      alert("서버 응답 실패");
      console.error(e);
    }
  };

  return (
    <StyledContainer>
      <ImageContainer image={image}></ImageContainer>
      <InputContainer>
        <StyledH1>CHANAWA</StyledH1>
        <StyledInput
          placeholder="아이디"
          value={inputId}
          onChange={(e) => handleInputChange(e, setInputId, setisId)}
        ></StyledInput>
        <StyledInput
          placeholder="비밀번호"
          value={inputPw}
          onChange={(e) => handleInputChange(e, setInputPw, setisPw)}
        ></StyledInput>
        {isId && isPw ? (
          <StyledButton enabled onClick={onClickLogin}>
            로그인
          </StyledButton>
        ) : (
          <StyledButton disabled>로그인</StyledButton>
        )}
      </InputContainer>
      <Footer>
        <StyledH3>© 2024 CHANAWA Korea Ltd.</StyledH3>
      </Footer>
    </StyledContainer>
  );
};

export default Login;
