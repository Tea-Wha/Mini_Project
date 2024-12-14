import AxiosApi from "../../api/Authentication";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FindId = () => {
  const navigate = useNavigate();

  const [inputEmail, setInputEmail] = useState(""); // 사용자가 입력한 이메일
  const [foundId, setFoundId] = useState(""); // 서버에서 받아온 ID
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지

  const onClickFindId = async () => {
    try {
      const rsp = await AxiosApi.findId(inputEmail); // 이메일만 전달
      console.log(rsp.data); // 응답 데이터를 콘솔에 출력하여 확인

      if (rsp.status === 200) {
        const userIdString = rsp.data.userId; // 서버에서 반환된 userId 문자열
        if (userIdString) {
          // "{USER_ID=test}"와 같은 문자열에서 "test" 부분만 추출
          const userId = userIdString.match(/USER_ID=(\w+)/); // 정규식을 사용하여 USER_ID 추출

          if (userId && userId[1]) {
            setFoundId(`해당하는 이메일에 대한 아이디는 : ${userId[1]} 입니다.`);
            setErrorMessage(""); // 성공 시 오류 메시지 초기화
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
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>ID 찾기</h2>
      <p>가입 시 사용한 이메일을 입력하세요.</p>
      <input
        type="email"
        value={inputEmail}
        placeholder="이메일 입력"
        onChange={(e) => setInputEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
      <br />
      <button
        onClick={onClickFindId}
        style={{
          padding: "10px 20px",
          margin: "10px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ID 찾기
      </button>
      {foundId && <p style={{ color: "green", fontWeight: "bold" }}>{foundId}</p>}
      {errorMessage && <p style={{ color: "red", fontWeight: "bold" }}>{errorMessage}</p>}
      <button
        onClick={() => navigate("/login")} // 로그인 페이지로 이동
        style={{
          padding: "10px 20px",
          backgroundColor: "#008CBA",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        로그인으로 이동
      </button>
    </div>
  );
};

export default FindId;
