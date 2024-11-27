import React, {useNavigate} from "react-router-dom";
import axios from "axios";

const TestHome = () => {
  const navigate = useNavigate();

  // 로그인 버튼 클릭 함수
  const loginButtonClick = async () => {
    try {
      // Spring Boot에 데이터 전송 및 URL 반환받기
      // 화면 이동의 기능을 구현할 때는 /navigate 로 시작하는 것으로 통일
      const response = await axios.post("/navigate/login");
      const redirectUrl = response.data.redirectUrl;
      console.log("Redirect URL : ", redirectUrl);
      // 반환받은 URL로 화면 이동
      navigate(redirectUrl);
    } catch (error) {
      console.error("Error during navigation:", error);
      alert("페이지 이동 중 오류가 발생했습니다.");
    } // 이런 공통 부분을 -> 전부 components 폴더로 넣을 것
  };
  return (
    <>
      <h1>테스트 홈 화면 입니다.</h1>
      <button className="login" onClick={loginButtonClick}>
        로그인 화면 이동
      </button>
    </>
  );
};
export default TestHome;
