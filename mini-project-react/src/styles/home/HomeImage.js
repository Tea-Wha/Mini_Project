import styled, {css} from "styled-components";

export const ImageContainer = styled.div`
  background-image: url(${(props) => props.imageLink});
  object-fit: cover;
  display: flex;
  justify-content: center;
  align-items: last baseline;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  position: relative;
`;
export const CircleButton = styled.button`
  background-color: ${({selected}) =>
    selected ? "black" : "#fff"}; // selected일 때 red로 변경
  // 보여주기용
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-left: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  transition: background-color 1s;
`;
