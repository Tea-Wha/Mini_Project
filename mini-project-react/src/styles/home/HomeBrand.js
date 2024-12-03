import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  // 크기 설정용
  width: 100%;
  height: 400px;
  // 영역 확인용
  background-color: white;
`;

export const SubContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: space-evenly;
  align-items: center;
  width: 98%;
  height: 90%;
  background-color: #f0f0f0;
  border: 2px solid black;
  border-radius: 10px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 5px;
  right: 20px;
  width: 100px;
  height: 50px;
  background-color: black;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  position: relative;
  width: 30px;
  height: 30px;
  & + & {
    margin-left: 20px;
  }
`;
