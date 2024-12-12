import React, { useState } from "react";
import { uploadCsvFile } from "../../api/CsvUploadApi"; // API 호출을 위한 함수

function FileUploadPage() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadStatus(""); // 파일 변경 시 상태 초기화
  };

  const handleUpload = async () => {
    if (!file) {
      alert("파일을 선택하세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true); // 업로드 시작 표시
    try {
      await uploadCsvFile(file); // 응답을 받을 필요가 없으므로 바로 호출만 합니다.
      setUploadStatus("CSV 파일이 성공적으로 업로드되었습니다!");
    } catch (error) {
      setUploadStatus("파일 업로드 중 오류가 발생했습니다.");
    } finally {
      setIsUploading(false); // 업로드 종료 표시
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
      <h2>CSV 파일 업로드</h2>
      <div style={{ marginBottom: "20px" }}>
        <input type="file" accept=".csv" onChange={handleFileChange} />
      </div>
      {file && (
        <div style={{ marginBottom: "10px" }}>
          <p>선택한 파일: {file.name}</p>
          <p>크기: {(file.size / 1024).toFixed(2)} KB</p>
        </div>
      )}
      <button onClick={handleUpload} disabled={isUploading} style={{ padding: "10px 20px" }}>
        {isUploading ? "업로드 중..." : "업로드"}
      </button>
      {uploadStatus && <div style={{ marginTop: "20px", color: uploadStatus.includes("성공") ? "green" : "red" }}>{uploadStatus}</div>}
    </div>
  );
}

export default FileUploadPage;
