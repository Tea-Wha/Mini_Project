import styled, {css} from "styled-components";

export const ImageContainer = styled.div`
  background-image: ${(props) => props.imageLink};
  object-fit: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
