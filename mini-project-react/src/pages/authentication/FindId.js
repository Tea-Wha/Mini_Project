import React, { useState } from "react";
import AxiosApi from "../../api/Authentication";
import { useNavigate } from "react-router-dom";
import { StyledContainer, InputContainer, StyledInput, StyledButton, StyledH1, StyledH3, Footer } from "../../styles/authentication/FindId";

const FindId = () => {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState("");
  const [foundId, setFoundId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onClickFindId = async () => {
    try {
      const rsp = await AxiosApi.findId(inputEmail); // email 파라미터로 서버에 요청청
      console.log(rsp.data);

      if (rsp.status === 200) {
        const userIdString = rsp.data.userId;
        if (userIdString) {
          const userId = userIdString.match(/USER_ID=(\w+)/);

          if (userId && userId[1]) {
            setFoundId(`해당하는 이메일에 대한 아이디는 : ${userId[1]} 입니다.`);
            setErrorMessage("");
          } else {
            setErrorMessage("해당하는 이메일에 대한 아이디를 찾을 수 없습니다.");
            setFoundId("");
          }
        } else {
          setErrorMessage("서버에서 아이디를 찾을 수 없습니다.");
          setFoundId("");
        }
      }
    } catch (e) {
      setErrorMessage("서버 응답 실패. 다시 시도해주세요.");
      setFoundId("");
      console.error(e);
    }
  };

  return (
    <StyledContainer>
      <InputContainer>
        <StyledH1>ID 찾기</StyledH1>
        <p>가입 시 사용한 이메일을 입력하세요.</p>
        <StyledInput
          type="email"
          value={inputEmail}
          placeholder="이메일 입력"
          onChange={(e) => setInputEmail(e.target.value)}
        />
        <StyledButton onClick={onClickFindId}>ID 찾기</StyledButton>
        {foundId && <StyledH3 success>{foundId}</StyledH3>}
        {errorMessage && <StyledH3>{errorMessage}</StyledH3>}
        <StyledButton onClick={() => navigate("/login")} style={{ backgroundColor: "#008CBA" }}>
          로그인으로 이동
        </StyledButton>
      </InputContainer>
      <Footer>
        <StyledH3>Footer Content</StyledH3>
      </Footer>
    </StyledContainer>
  );
};

export default FindId;
