import styled, {css} from "styled-components";

export const StyledContainer = styled.div`
  display: flex;
  margin: 0 auto;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Items = styled.div`
  margin-bottom: 5px;

  ${(props) =>
    props.variant === "item2" &&
    `
      display: flex;
      flex-direction: column;
    `}

  ${(props) =>
    props.variant === "hint" &&
    `
      font-size: 12px;
      color: #777;
    `}
`;

export const ImageContainer = styled.div`
  display: flex;
  width: 70vw;
  height: 100%;
  overflow: hidden;
  @media (max-width: 1100px) {
    width: 100vw;
  }
  background-image: url(${(props) => props.image});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const InputContainer = styled.div`
  display: flex;
  width: 30vw;
  height: 92%;
  background-color: white;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 1100px) {
    position: absolute;
    left: 50%;
    top: 10%;
    height: 82%;
    transform: translate(-50%, 0);
    width: 400px;
  }
`;

export const Footer = styled.div`
  display: flex;
  width: 30vw;
  height: 8%;
  background-color: black;
  position: absolute;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  right: 0px;
  @media (max-width: 1100px) {
    position: absolute;
    left: 50%;
    bottom: 0%;
    height: 8%;
    transform: translate(-50%, 0);
    width: 400px;
  }
`;

export const StyledH3 = styled.h3`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  &::after {
    content: "";
    position: absolute;
    margin-top: 40px;
    width: 300px;
    height: 2px;
    background-color: #dadcdf;
    transform: rotate(0deg);
  }

  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
`;

export const StyledInput = styled.input`
  height: 50px;
  width: 300px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 10px;
  display: flex;
  border: 2px solid #f0f0f0;

  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
`;

export const StyledButton = styled.button`
  height: 50px;
  width: 300px;
  margin: 0;
  padding: 0;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-bottom: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &::after {
    content: "";
    position: absolute;
    margin-top: 140px;
    width: 300px;
    height: 2px;
    background-color: #dadcdf;
    transform: rotate(0deg);
  }
  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
`;

export const StyledH1 = styled.h1`
  margin-bottom: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bolder;
  font-size: 2.3rem;

  &::after {
    content: "";
    position: absolute;
    margin-top: 100px;
    width: 300px;
    height: 2px;
    background-color: #dadcdf;
    transform: rotate(0deg);
  }

  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
`;
