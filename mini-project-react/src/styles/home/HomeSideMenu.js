import styled, { css } from "styled-components";

export const MenuSideContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  // 보이기용
  height: 100vh;
  z-index: -1;

  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.isSubOpen &&
    css`
      transform: translateX(100%);
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
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  ${(props) =>
    props.isSubOpen &&
    css`
      background-color: white;
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
  ${(props) =>
    props.isSubOpen &&
    css`
      background-color: white;
      color: black;
    `}
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
