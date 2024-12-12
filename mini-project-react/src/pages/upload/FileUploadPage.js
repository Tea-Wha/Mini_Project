import React, { useState } from "react";
import { uploadCarCsvFile } from "../../api/CsvUploadApi"; // API 호출을 위한 함수
import { uploadColorCsvFile } from "../../api/CsvUploadApi"; // API 호출을 위한 함수
import { uploadFeatureCsvFile } from "../../api/CsvUploadApi"; // API 호출을 위한 함수

function FileUploadPage() {
  const [fileForCar, setFileForCar] = useState(null);
  const [fileForColor, setFileForColor] = useState(null);
  const [fileForFeature, setFileForFeature] = useState(null);
  const [uploadStatusForCar, setUploadStatusForCar] = useState("");
  const [uploadStatusForColor, setUploadStatusForColor] = useState("");
  const [uploadStatusForFeature, setUploadStatusForFeature] = useState("");
  const [isUploadingForCar, setIsUploadingForCar] = useState(false);
  const [isUploadingForColor, setIsUploadingForColor] = useState(false);
  const [isUploadingForFeature, setIsUploadingForFeature] = useState(false);
  const [isFileNameValidForCar, setIsFileNameValidForCar] = useState(false);
  const [isFileNameValidForColor, setIsFileNameValidForColor] = useState(false);
  const [isFileNameValidForFeature, setIsFileNameValidForFeature] = useState(false);

  const handleFileChangeForCar = (event) => {
    const file = event.target.files[0]; // 선택 파일 변수 지정
    setFileForCar(file);
    setUploadStatusForCar(""); // 상태 초기화

    // 파일 이름 검증로직
    if (file && file.name === "Cars.csv") {
      setIsFileNameValidForCar(true);
    } else {
      setIsFileNameValidForCar(false);
      setUploadStatusForCar("파일 이름은 반드시 'Cars.csv'여야 합니다.");
    }
  };

  const handleFileChangeForColor = (event) => {
    const file = event.target.files[0]; // 선택 파일 변수 지정
    setFileForColor(file);
    setUploadStatusForColor(""); // 상태 초기화

    // 파일 이름 검증로직
    if (file && file.name === "Colors.csv") {
      setIsFileNameValidForColor(true);
    } else {
      setIsFileNameValidForColor(false);
      setUploadStatusForColor("파일 이름은 반드시 'Colors.csv'여야 합니다.");
    }
  };

  const handleFileChangeForFeature = (event) => {
    const file = event.target.files[0]; // 선택 파일 변수 지정
    setFileForFeature(file);
    setUploadStatusForFeature(""); // 상태 초기화

    // 파일 이름 검증로직
    if (file && file.name === "Features.csv") {
      setIsFileNameValidForFeature(true);
    } else {
      setIsFileNameValidForFeature(false);
      setUploadStatusForFeature("파일 이름은 반드시 'Features.csv'여야 합니다.");
    }
  };

  const handleUploadForCar = async () => {
    if (!fileForCar) {
      alert("파일을 선택하세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileForCar);

    setIsUploadingForCar(true); // 업로드 시작 표시
    try {
      await uploadCarCsvFile(fileForCar); // 응답을 받을 필요가 없으므로 바로 호출만 합니다.
      setUploadStatusForCar("Car CSV 파일이 성공적으로 업로드되었습니다!");
    } catch (error) {
      setUploadStatusForCar("Car 파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploadingForCar(false); // 업로드 종료 표시
    }
  };

  const handleUploadForColor = async () => {
    if (!fileForColor) {
      alert("파일을 선택하세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileForColor);

    setIsUploadingForColor(true); // 업로드 시작 표시
    try {
      await uploadColorCsvFile(fileForColor); // 응답을 받을 필요가 없으므로 바로 호출만 합니다.
      setUploadStatusForColor("Color CSV 파일이 성공적으로 업로드되었습니다!");
    } catch (error) {
      setUploadStatusForColor("Color 파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploadingForColor(false); // 업로드 종료 표시
    }
  };

  const handleUploadForFeature = async () => {
    if (!fileForFeature) {
      alert("파일을 선택하세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileForFeature);

    setIsUploadingForFeature(true); // 업로드 시작 표시
    try {
      await uploadFeatureCsvFile(fileForFeature); // 응답을 받을 필요가 없으므로 바로 호출만 합니다.
      setUploadStatusForFeature("Feature CSV 파일이 성공적으로 업로드되었습니다!");
    } catch (error) {
      setUploadStatusForFeature("Feature 파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploadingForFeature(false); // 업로드 종료 표시
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h2>CAR CSV 파일 업로드</h2>
      <h3>업로드시 이름은 반드시 Cars.csv 형식 이어야 합니다</h3>
      <input type="file" accept=".csv" onChange={handleFileChangeForCar} />
      {fileForCar && (
        <div style={{ marginBottom: "10px" }}>
          <p>선택한 파일: {fileForCar.name}</p>
          <p>크기: {(fileForCar.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        <button onClick={handleUploadForCar} disabled={isUploadingForCar || !isFileNameValidForCar} style={{ padding: "10px 20px" }}>
          {isUploadingForCar ? "업로드 중..." : "Car 업로드"}
        </button>
      </div>
      {uploadStatusForCar && <div style={{ marginTop: "20px", color: uploadStatusForCar.includes("성공") ? "green" : "red" }}>{uploadStatusForCar}</div>}
      <h2>COLOR CSV 파일 업로드</h2>
      <h3>업로드시 이름은 반드시 Colors.csv 형식 이어야 합니다</h3>
      <input type="file" accept=".csv" onChange={handleFileChangeForColor} />
      {fileForColor && (
        <div style={{ marginBottom: "10px" }}>
          <p>선택한 파일: {fileForColor.name}</p>
          <p>크기: {(fileForColor.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        <button onClick={handleUploadForColor} disabled={isUploadingForColor || !isFileNameValidForColor} style={{ padding: "10px 20px" }}>
          {isUploadingForColor ? "업로드 중..." : "Color 업로드"}
        </button>
      </div>
      {uploadStatusForColor && <div style={{ marginTop: "20px", color: uploadStatusForColor.includes("성공") ? "green" : "red" }}>{uploadStatusForColor}</div>}
      <h2>FEATURE CSV 파일 업로드</h2>
      <h3>업로드시 이름은 반드시 Features.csv 형식 이어야 합니다</h3>
      <input type="file" accept=".csv" onChange={handleFileChangeForFeature} />
      {fileForFeature && (
        <div style={{ marginBottom: "10px" }}>
          <p>선택한 파일: {fileForFeature.name}</p>
          <p>크기: {(fileForFeature.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
        <button onClick={handleUploadForFeature} disabled={isUploadingForFeature || !isFileNameValidForFeature} style={{ padding: "10px 20px" }}>
          {isUploadingForFeature ? "업로드 중..." : "Feature 업로드"}
        </button>
      </div>
      {uploadStatusForFeature && (
        <div style={{ marginTop: "20px", color: uploadStatusForFeature.includes("성공") ? "green" : "red" }}>{uploadStatusForFeature}</div>
      )}
    </div>
  );
}

export default FileUploadPage;
