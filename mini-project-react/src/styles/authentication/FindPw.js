import styled from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #f5f5f5;
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 40vw;
  height: 100vh;
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 70vh;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

export const StyledH3 = styled.h3`
  color: red;
  font-size: 1.2rem;
  margin-top: 20px;
`;

export const StyledInput = styled.input`
  width: 80%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const StyledButton = styled.button`
  width: 80%;
  padding: 12px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
