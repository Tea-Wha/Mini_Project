import React, { useState } from "react";
import AxiosApi from "../../api/Authentication";
import { Button, Container, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigator = useNavigate();
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const [isId, setisId] = useState(false);
  const [isPw, setisPw] = useState(false);

  const handleInputChange = (e, setState, setValidState) => {
    setState(e.target.value);
    setValidState(e.target.value.length >= 5);
  };

  const onClickLogin = async () => {
    try {
      const rsp = await AxiosApi.login(inputId, inputPw);
      console.log(rsp.data);
      if (rsp.data) {
        navigator("/");
      } else {
        alert("아이디 또는 비밀번호가 일치하지 않습니다.");
      }
    } catch (e) {
      alert("서버 응답 실패");
      console.log(e);
    }
  };

  return (
    <Container>
      <Input placeholder="아이디" value={inputId} onChange={(e) => handleInputChange(e, setInputId, setisId)}></Input>
      <Input placeholder="비밀번호" value={inputPw} onChange={(e) => handleInputChange(e, setInputPw, setisPw)}></Input>
      {isId && isPw ? (
        <Button enabled onClick={onClickLogin}>
          로그인
        </Button>
      ) : (
        <Button disabled>로그인</Button>
      )}
    </Container>
  );
};

export default Login;
