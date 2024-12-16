import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const MenuContainer = styled.div`
  display: flex;
  position: absolute;
  justify-content: space-between;

  // 보이기용
  height: 100vh;
  width: 370px;
  left: 0;
  top: 0;
  background-color: rgba(128, 128, 128, 0.6);
  z-index: 10;
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;

  ${(props) =>
    props.isOpen &&
    css`
      transform: translateX(0);
    `}
  ${(props) =>
    (props.subPageOpen.brand || props.subPageOpen.myPage) &&
    css`
      width: 650px;
    `}
`;

export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  // 보이기용 공간
  margin: 10px 20px;
  background-color: white;
  position: relative;
  height: 320px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const FindGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const MenuItem = styled.button`
  // 그리기용
  width: 200px;
  margin: 10px 20px;
  padding: 10px 20px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  font-size: 1.1rem;
  margin-bottom: 15px;
  margin-top: 15px;
  position: relative;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease, transform 0.5s ease;
  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
  background-color: ${(props) =>
    props.isSubOpen ? "rgba(128,128,128,0.3)" : "white"};
  &:hover {
    background-color: #e9e9e9;
  }
  & + &::before {
    content: "";
    position: absolute;
    top: -15px;
    left: 0px;
    width: 200px;
    height: 2px;
    background-color: #dadcdf;
    transform: rotate(0deg);
  }
  ${(props) =>
    props.id === "brand" &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: -15px;
        left: 0px;
        width: 200px;
        height: 2px;
        background-color: #dadcdf;
        transform: rotate(0deg);
      }
      &::after {
        content: "";
        position: absolute;
        top: 60px;
        left: 0px;
        width: 200px;
        height: 2px;
        background-color: #dadcdf;
        transform: rotate(0deg);
      }
    `}
`;
// toggle 버튼들 누를 시 선이 사라지는 현상 발생
// 해결하긴 했지만 마음에 안들게 해결함 -> 나중에 다시 봐볼것

export const CloseButton = styled.button`
  // 그리기용
  width: 50px;
  height: 50px;
  margin: 10px 20px;
  padding: 10px 20px;
  background-color: rgba(128, 128, 128, 0);
  border-radius: 30%;
  position: relative;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s ease, transform 0.5s ease;
  &:hover {
    background-color: rgba(128, 128, 128, 0.3);
    font-weight: bold;
  }
  &:hover::before {
    height: 2px;
  }
  &:hover::after {
    height: 2px;
  }
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 1px;
    background-color: black;
    border-radius: 10px;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 15px;
    height: 1px;
    border-radius: 10px;
    background-color: black;
    transform: translate(-50%, -50%) rotate(45deg);
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  position: relative;
  color: black;
`;
export const StyledDiv = styled.div`
  background-color: none;
  width: 20px;
  height: 20px;
  display: flex;
  position: absolute;
  right: 5px;
  top: 10px;
  &::before {
    content: "";
    position: absolute;
    top: 55%;
    left: 60%;
    width: 10px;
    height: 2px;
    background-color: grey;
    transform: translate(-50%, -50%) rotate(45deg);
  }
  &::after {
    content: "";
    position: absolute;
    top: 85%;
    left: 60%;
    width: 10px;
    height: 2px;
    background-color: grey;
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
