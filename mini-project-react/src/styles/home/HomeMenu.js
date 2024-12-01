import styled, { css } from "styled-components";

export const MenuContainer = styled.div`
  display: flex;
  position: fixed;
  // 보이기용
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(128, 128, 128, 0.6);
  z-index: 2;
`;

export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  // 보이기용 공간
  margin: 10px 20px;
  background-color: white;
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
`;

export const CloseButton = styled.button`
  // 그리기용
  width: 50px;
  height: 50px;
  margin: 10px 20px;
  padding: 10px 20px;
  text-align: center;
  background-color: rgba(128, 128, 128, 0);
  border-radius: 30%;
  border: none;
  cursor: pointer;
  transition: background-color 0.5s ease, transform 0.5s ease;
  &:hover {
    background-color: rgba(128, 128, 128, 0.3);
  }
`;

export const MenuItemSmall = styled.button`
  width: 90px;
  padding: 5px 0;
`;
