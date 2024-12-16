import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const MenuSideContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  // 보이기용
  height: 100vh;
  z-index: -1;
  box-sizing: border-box;

  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.isSubOpen &&
    css`
      transform: translateX(100%);
      /* overflow-y: auto; */
    `}
`;

export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  // 보이기용 공간
  margin: 10px 20px;
  background-color: transparent;
  position: relative;
  height: 50vh;
  border-radius: 10px;
  align-items: center;
  ${(props) =>
    props.isSubOpen &&
    css`
      background-color: white;
      overflow-y: auto;
    `}
`;

export const MenuItem = styled.button`
  // 그리기용
  width: 200px;
  margin: 10px 20px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  color: transparent;
  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
  ${(props) =>
    props.isSubOpen &&
    css`
      background-color: white;
      color: black;
    `}
`;

export const MenuItemBrand = styled.button`
  // 그리기용
  width: 200px;
  margin: 10px 20px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  font-weight: bold;
  font-size: 1rem;
  color: transparent;
  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
  ${(props) =>
    props.isSubOpen &&
    css`
      background-color: white;
      color: black;
    `}
  &:hover {
    text-decoration: underline;
  }
`;

export const MenuItemSmall = styled.button`
  width: 90px;
  padding: 5px 0;
  font-size: 0.8em;
  margin: 15px 0 0;
  background-color: transparent;
  border: none;
  font-weight: bold;
  cursor: pointer;
  color: transparent;
  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
  ${(props) =>
    props.isSubOpen &&
    css`
      background-color: white;
      color: black;
    `}
`;

export const FindGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

export const MenuLogo = styled.div`
  position: absolute;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 60px;
  height: 40px;
  border-radius: 10px;
  right: 0px;
  border: none;
  z-index: 2;
  top: 15px;
  ${(props) =>
    props.isSubOpen &&
    css`
      background-image: url(${(props) => props.logo});
      background-color: white;
      border-radius: 0px;
      border: none;
    `}
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  justify-content: center;
`;
