import styled, {css} from "styled-components";
import {Link} from "react-router-dom";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  // 크기 설정용
  width: 100%;
  height: 500px;
  // 영역 확인용
  background-color: bisque;
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  // 크기 설정용
  width: 100%;
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
  margin-top: 10px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    background-color: rgba(128, 128, 128, 0.5);
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
  color: black;
  margin-top: 5px;
  font-weight: bold;
  font-size: 1.4rem;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
