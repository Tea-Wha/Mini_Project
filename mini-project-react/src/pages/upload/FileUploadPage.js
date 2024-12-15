import React, { useState } from "react";
import { uploadCarCsvFile, uploadColorCsvFile, uploadFeatureCsvFile } from "../../api/CsvUploadApi";
import {
  StyledContainer,
  UploadSection,
  StyledButton,
  StatusMessage,
  InputContainer,
  StyledInput,
  StyledH2,
  StyledH3,
  FileInfo,
} from "../../styles/upload/FileUploadPage";

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
    const file = event.target.files[0];
    setFileForCar(file);
    setUploadStatusForCar("");

    if (file && file.name === "Cars.csv") {
      setIsFileNameValidForCar(true);
    } else {
      setIsFileNameValidForCar(false);
      setUploadStatusForCar("파일 업로드에 실패하였습니다");
    }
  };

  const handleFileChangeForColor = (event) => {
    const file = event.target.files[0];
    setFileForColor(file);
    setUploadStatusForColor("");

    if (file && file.name === "Colors.csv") {
      setIsFileNameValidForColor(true);
    } else {
      setIsFileNameValidForColor(false);
      setUploadStatusForColor("파일 업로드에 실패하였습니다");
    }
  };

  const handleFileChangeForFeature = (event) => {
    const file = event.target.files[0];
    setFileForFeature(file);
    setUploadStatusForFeature("");

    if (file && file.name === "Features.csv") {
      setIsFileNameValidForFeature(true);
    } else {
      setIsFileNameValidForFeature(false);
      setUploadStatusForFeature("파일 업로드에 실패하였습니다");
    }
  };

  const handleUploadForCar = async () => {
    if (!fileForCar) {
      alert("파일을 선택하세요!");
      return;
    }

    setIsUploadingForCar(true);
    try {
      await uploadCarCsvFile(fileForCar);
      setUploadStatusForCar("Car CSV 파일이 성공적으로 업로드되었습니다!");
    } catch (error) {
      setUploadStatusForCar("Car 파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploadingForCar(false);
    }
  };

  const handleUploadForColor = async () => {
    if (!fileForColor) {
      alert("파일을 선택하세요!");
      return;
    }

    setIsUploadingForColor(true);
    try {
      await uploadColorCsvFile(fileForColor);
      setUploadStatusForColor("Color CSV 파일이 성공적으로 업로드되었습니다!");
    } catch (error) {
      setUploadStatusForColor("Color 파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploadingForColor(false);
    }
  };

  const handleUploadForFeature = async () => {
    if (!fileForFeature) {
      alert("파일을 선택하세요!");
      return;
    }

    setIsUploadingForFeature(true);
    try {
      await uploadFeatureCsvFile(fileForFeature);
      setUploadStatusForFeature("Feature CSV 파일이 성공적으로 업로드되었습니다!");
    } catch (error) {
      setUploadStatusForFeature("Feature 파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploadingForFeature(false);
    }
  };

  return (
    <StyledContainer>
      <StyledH2>CSV 파일 업로드</StyledH2>

      {/* Car Upload Section */}
      <UploadSection>
        <StyledH3>Cars.csv 파일 업로드</StyledH3>
        <InputContainer>
          <StyledInput type="file" accept=".csv" onChange={handleFileChangeForCar} />
        </InputContainer>
        {fileForCar && (
          <FileInfo>
            <p>선택한 파일: {fileForCar.name}</p>
            <p>크기: {(fileForCar.size / 1024).toFixed(2)} KB</p>
          </FileInfo>
        )}
        <StyledButton onClick={handleUploadForCar} disabled={isUploadingForCar || !isFileNameValidForCar}>
          {isUploadingForCar ? "업로드 중..." : "Car 업로드"}
        </StyledButton>
        {uploadStatusForCar && <StatusMessage success={uploadStatusForCar.includes("성공")}>{uploadStatusForCar}</StatusMessage>}
      </UploadSection>

      {/* Color Upload Section */}
      <UploadSection>
        <StyledH3>Colors.csv 파일 업로드</StyledH3>
        <InputContainer>
          <StyledInput type="file" accept=".csv" onChange={handleFileChangeForColor} />
        </InputContainer>
        {fileForColor && (
          <FileInfo>
            <p>선택한 파일: {fileForColor.name}</p>
            <p>크기: {(fileForColor.size / 1024).toFixed(2)} KB</p>
          </FileInfo>
        )}
        <StyledButton onClick={handleUploadForColor} disabled={isUploadingForColor || !isFileNameValidForColor}>
          {isUploadingForColor ? "업로드 중..." : "Color 업로드"}
        </StyledButton>
        {uploadStatusForColor && <StatusMessage success={uploadStatusForColor.includes("성공")}>{uploadStatusForColor}</StatusMessage>}
      </UploadSection>

      {/* Feature Upload Section */}
      <UploadSection>
        <StyledH3>Features.csv 파일 업로드</StyledH3>
        <InputContainer>
          <StyledInput type="file" accept=".csv" onChange={handleFileChangeForFeature} />
        </InputContainer>
        {fileForFeature && (
          <FileInfo>
            <p>선택한 파일: {fileForFeature.name}</p>
            <p>크기: {(fileForFeature.size / 1024).toFixed(2)} KB</p>
          </FileInfo>
        )}
        <StyledButton onClick={handleUploadForFeature} disabled={isUploadingForFeature || !isFileNameValidForFeature}>
          {isUploadingForFeature ? "업로드 중..." : "Feature 업로드"}
        </StyledButton>
        {uploadStatusForFeature && <StatusMessage success={uploadStatusForFeature.includes("성공")}>{uploadStatusForFeature}</StatusMessage>}
      </UploadSection>
    </StyledContainer>
  );
}

export default FileUploadPage;
