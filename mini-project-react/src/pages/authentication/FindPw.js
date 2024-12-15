import React, { useState } from "react";
import AxiosApi from "../../api/Authentication";

const FindPw = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await AxiosApi.requestPassword(email);
      setMessage("리셋을 위한 링크가 성공적으로 전송 되었습니다..");
    } catch (err) {
      setError("리셋을 위한 시도가 실패 하였습니다, 이메일 주소를 다시 확인 해 주세요");
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">이메일을 입력 해 주세요:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">다음</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FindPw;
