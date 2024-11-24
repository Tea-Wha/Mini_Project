import React, { useEffect } from "react";
import axios from "axios";

const TestApi = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8111/api/test");
        console.log("Response:", response.data); // 응답 데이터 확인
      } catch (error) {
        console.error("Error", error); // 에러가 발생하면 로그 출력
      }
    };

    fetchData(); // useEffect 안에서 API 호출
  }, []); // 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  return <div>Check Console for API Response</div>;
};

export default TestApi;
