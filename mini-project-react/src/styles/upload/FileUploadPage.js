import styled from 'styled-components';

// 전체 컨테이너
export const StyledContainer = styled.div`
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

// 파일 업로드 섹션
export const UploadSection = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

// 파일 이름 정보
export const FileInfo = styled.div`
  font-size: 0.9rem;
  color: #555;
  margin-top: 10px;
`;

// 버튼 스타일
export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #0056b3;
  }
`;

// 상태 메시지
export const StatusMessage = styled.p`
  font-size: 1rem;
  margin-top: 10px;
  font-weight: bold;
  color: ${(props) => (props.success ? "#28a745" : "#dc3545")};
`;

// 파일 입력 컨테이너
export const InputContainer = styled.div`
  margin-bottom: 20px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const StyledH2 = styled.h2`
  text-align: center;
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
`;

export const StyledH3 = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
`;
