import styled, { css } from "styled-components";

export const MenuSideContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  // 보이기용
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.6);
  z-index: -1;

  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out;

  ${(props) =>
    props.isSubOpen &&
    css`
      transform: translateX(132%);
    `}
`;

export const MenuGroup = styled.div`
  display: flex;
  flex-direction: column;
  // 보이기용 공간
  margin: 10px 20px;
  background-color: white;
  position: relative;
  height: 50vh;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const MenuItem = styled.button`
  // 그리기용
  width: 200px;
  margin: 10px 20px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: white;
  border: none;
  font-weight: bold;
`;

export const MenuItemSmall = styled.button`
  width: 90px;
  padding: 5px 0;
  margin-top: 15px;
  background-color: white;
  border: none;
  font-weight: bold;
  cursor: pointer;
`;
