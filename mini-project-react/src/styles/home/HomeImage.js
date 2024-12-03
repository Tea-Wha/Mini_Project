import styled, { css } from "styled-components";

export const ImageContainer = styled.div`
  background-image: url(${(props) => props.imageLink});
  object-fit: cover;
  display: flex;
  align-items: last baseline;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100%;
  position: relative;
`;
export const CircleButton = styled.button`
  background-color: ${({ selected }) =>
    selected ? "black" : "#fff"}; // selected일 때 red로 변경
  // 보여주기용
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 18px;
  margin-bottom: 25px;
  cursor: pointer;
`;
