import React, { useState } from "react";
import AxiosApi from "../../api/Authentication";
import { Navigate } from "react-router-dom";
import { StyledContainer, ImageContainer, InputContainer, StyledH3, StyledInput, StyledButton, StyledH1 } from "../../styles/authentication/FindPw";

const FindPw = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const result = await AxiosApi.findPw(userId, email, newPassword);
      setSuccess(result);
      setError("");
    } catch (err) {
      setError(err.response?.data || "비밀번호 변경 실패");
      setSuccess("");
    }
  };

  if (success) {
    return <Navigate to="/login" replace />;
  }

  return (
    <StyledContainer>
      <ImageContainer image="your-image-url.jpg" />
      <InputContainer>
        <StyledH1>비밀번호 재설정</StyledH1>
        <form onSubmit={submit}>
          <div>
            <label>아이디:</label>
            <StyledInput type="text" value={userId} onChange={(e) => setUserId(e.target.value)} required />
          </div>
          <div>
            <label>이메일:</label>
            <StyledInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label>새 비밀번호:</label>
            <StyledInput type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </div>
          <StyledButton type="submit">비밀번호 재설정</StyledButton>
        </form>
        {error && <StyledH3>{error}</StyledH3>}
      </InputContainer>
    </StyledContainer>
  );
};

export default FindPw;
