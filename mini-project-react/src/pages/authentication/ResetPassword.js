import React, { useState, useEffect } from "react";
import AxiosApi from "../../api/Authentication";

const ResetPassword = ({ token }) => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        setLoading(true);
        await AxiosApi.validateToken(token);
        setIsTokenValid(true);
      } catch (err) {
        setError("토크이 일치하지 않거나 제한 시간을 초과 하였습니다.");
        setIsTokenValid(false);
      } finally {
        setLoading(false);
      }
    };
    if (token) {
      checkToken();
    } else {
      setError("토큰이 발급되지 않았습니다다.");
      setLoading(false);
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!isTokenValid) {
      setError("토큰이 일치하지 않습니다..");
      return;
    }

    try {
      await AxiosApi.changePassword(token, newPassword);
      setMessage("비밀번호가 성공적으로 변경 되었습니다.");
    } catch (err) {
      setError("비밀변호 변경에 실패 하였습니다. 다시 시도해 주세요");
    }
  };

  if (loading) {
    return <p>토큰 검사...</p>;
  }

  return (
    <div>
      <h2>Reset Your Password</h2>
      {!isTokenValid ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          <button type="submit">비밀변호 변경</button>
        </form>
      )}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && isTokenValid && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default ResetPassword;
