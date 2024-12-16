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

export const downloadCarFile = async () => {
  try {
    const response = await axios.get(KH_DOMAIN + "/csv/downloadCar", {
      responseType: "arraybuffer", // 파일 데이터를 바이너리 형식으로 받아옴
    });

    // 응답으로 받은 파일 데이터를 Blob으로 변환
    const blob = new Blob([response.data], { type: "text/csv" });
    return blob;
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

export const downloadColorFile = async () => {
  try {
    const response = await axios.get(KH_DOMAIN + "/csv/downloadColor", {
      responseType: "arraybuffer", // 파일 데이터를 바이너리 형식으로 받아옴
    });

    // 응답으로 받은 파일 데이터를 Blob으로 변환
    const blob = new Blob([response.data], { type: "text/csv" });
    return blob;
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};

export const downloadFeatureFile = async () => {
  try {
    const response = await axios.get(KH_DOMAIN + "/csv/downloadFeature", {
      responseType: "arraybuffer", // 파일 데이터를 바이너리 형식으로 받아옴
    });

    // 응답으로 받은 파일 데이터를 Blob으로 변환
    const blob = new Blob([response.data], { type: "text/csv" });
    return blob;
  } catch (error) {
    console.error("파일 다운로드 중 오류 발생:", error);
    throw error; // 에러를 호출한 곳으로 전달
  }
};
