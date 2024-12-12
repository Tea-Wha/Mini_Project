import axios from "axios";

const KH_DOMAIN = "http://localhost:8111";

// 차량 CSV 파일 업로드 API 함수
export const uploadCarCsvFile = async (fileForCar) => {
  const formData = new FormData();
  formData.append("fileForCar", fileForCar);

  try {
    const response = await axios.post(KH_DOMAIN + "/csv/uploadCar", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더
      },
    });
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    throw error; // 오류 처리
  }
};

// 색상 CSV 파일 업로드 API 함수
export const uploadColorCsvFile = async (fileForColor) => {
  const formData = new FormData();
  formData.append("fileForColor", fileForColor);

  try {
    const response = await axios.post(KH_DOMAIN + "/csv/uploadColor", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더
      },
    });
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    throw error; // 오류 처리
  }
};

// 옵션 CSV 파일 업로드 API 함수
export const uploadFeatureCsvFile = async (fileForFeature) => {
  const formData = new FormData();
  formData.append("fileForFeature", fileForFeature);

  try {
    const response = await axios.post(KH_DOMAIN + "/csv/uploadFeature", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // 파일 업로드를 위한 헤더
      },
    });
    return response.data; // 서버 응답 데이터 반환
  } catch (error) {
    console.error("파일 업로드 실패:", error);
    throw error; // 오류 처리
  }
};
