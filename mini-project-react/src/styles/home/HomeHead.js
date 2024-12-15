import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // 크기 설정용
  width: 100vw;
  height: 100vh;
  // 영역 확인용
  z-index: 10;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
	top: 0;
  // 크기 설정용
  width: 100%;
  position: absolute;
  z-index: 10;
`;
export const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  display: flex;
  justify-content: space-evenly;
  width: 100px;
  background-color: rgba(128, 128, 128, 0);
  border: none;
  text-align: center;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  color: white;
  height: 40px;
  transition: background-color 0.5s ease, transform 0.5s ease;
  z-index: 10;
  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";

  &:hover {
    background-color: rgba(128, 128, 128, 0.1);
  }
`;

export const ImageCounterContainer = styled.div`
  width: 150px;
  margin: 0 auto;
  background-color: aquamarine;
`;

export const Initial = styled.div`
  margin: 0 auto;
  cursor: pointer;
  color: white;
  margin-top: 0px;
  font-weight: bold;
  font-size: 1.6rem;
  display: flex;
  z-index: 10;
  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
`;

export const StyledLink = styled(Link)`
  color: black;
		min-width: 100px;
		min-height: 50px;
  text-decoration: none;
  display: flex;
  justify-content: end;
		align-items: center;
  font-weight: bold;
  font-size: 1.2em;
  z-index: 10;
`;
