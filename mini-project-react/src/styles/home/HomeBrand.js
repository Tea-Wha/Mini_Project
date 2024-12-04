import styled from "styled-components";
import {Link} from "react-router-dom";

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
  background-color: none;
  justify-content: center;
  align-items: center;
`;

export const Button = styled.button`
  display: flex;
  position: relative;
  width: 30px;
  height: 30px;
  border: 1px solid #dadcdf;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  background-color: white;
  &:hover {
    /* background-color: rgba(128, 128, 128, 0.3); */
    background-color: #e9e9e9;
  }
  & + & {
    margin-left: 20px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 39%;
    left: 45%;
    width: 10px;
    height: 2px;
    background-color: grey;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &::after {
    content: "";
    position: absolute;
    top: 61%;
    left: 45%;
    width: 10px;
    height: 2px;
    background-color: grey;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  & + &::before {
    position: absolute;
    top: 39%;
    left: 55%;
    width: 10px;
    height: 2px;
    background-color: grey;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  & + &::after {
    content: "";
    position: absolute;
    top: 61%;
    left: 55%;
    width: 10px;
    height: 2px;
    background-color: grey;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
