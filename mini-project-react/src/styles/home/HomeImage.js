import styled, {css} from "styled-components";

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
  background-color: ${({selected}) =>
    selected ? "black" : "#fff"}; // selected일 때 red로 변경
  // 보여주기용
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 18px;
  margin-bottom: 25px;
  cursor: pointer;
`;
export const PauseButton = styled.button`
  background-color: transparent;
  width: 15px;
  height: 15px;
  margin-bottom: 25px;
  margin-left: 180px;
  position: absolute;
  border: none;
  cursor: pointer;
  display: ${(props) => (props.isPause ? "flex" : "none")};
  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: -4px;
    width: 15px;
    height: 3px;
    border-radius: 10px;
    background-color: white;
    transform: rotate(90deg);
  }
  &::after {
    content: "";
    position: absolute;
    top: 6px;
    left: 4px;
    width: 15px;
    height: 3px;
    border-radius: 10px;
    background-color: white;
    transform: rotate(90deg);
  }
`;
export const StartButton = styled.button`
  background-color: transparent;
  width: 15px;
  height: 15px;
  margin-bottom: 25px;
  margin-left: 180px;
  position: absolute;
  border: none;
  cursor: pointer;
  display: ${(props) => (props.isStart ? "flex" : "none")};
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-bottom: 7px solid transparent;
    border-left: 13px solid white;
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;
