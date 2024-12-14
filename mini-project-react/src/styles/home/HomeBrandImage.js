import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

export const BrandImageButton = styled.fieldset`
  display: flex;
  flex-direction: row;
  position: relative;
  object-fit: contain;
  width: 23vw;
  height: 250px;
  border: none;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  margin: 0;
  padding: 0;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    height: 150px;
  }
`;
// 위치 및 화면 조정에 따른 component 어떻게 처리할지 논의 필요
export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const StyledLegend = styled.legend`
  @font-face {
    font-family: "hyundai";
    src: url("/fonts/HYUNDAI2.ttf") format("truetype");
  }
  @font-face {
    font-family: "kia";
    src: url("/fonts/KIA_Bold.ttf") format("truetype");
  }
  @font-face {
    font-family: "benz";
    src: url("/fonts/MBKCorpoA.ttf") format("truetype");
  }
  @font-face {
    font-family: "bmw";
    src: url("/fonts/BMWHelvetica-Bold.otf") format("opentype");
  }
  @font-face {
    font-family: "genesis";
    src: url("/fonts/GenesisSansTextKROTFMedium.otf") format("opentype");
  }
  color: black;
  position: relative;
  margin-left: 10px;
  font-size: 1.2rem;
  font-size: ${(props) => {
    if (props.name === "BMW8 COUPE") return "1.1rem";
    else return "1.2rem";
  }};

  font-family: ${(props) => {
    if (props.name === "CONA") return "'hyundai', sans-serif";
    else if (props.name === "EV6") return "'kia', sans-serif";
    else if (props.name === "G-CLASS") return "'benz', sans-serif";
    else if (props.name === "BMW8 COUPE") return "'bmw', sans-serif";
    else if (props.name === "G70") return "'genesis', sans-serif";
  }};
`;

export const StyledLabel = styled.label`
  background-image: url(${(props) => props.logoimageLink});
  display: flex;
  position: absolute;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 80px;
  height: 40px;
  border-radius: 0px;
  right: 5px;
  top: -25px;
  z-index: 3;
  /* border: 1px solid black; */
  @media (max-width: 768px) {
    background-size: contain;
  }
  height: ${(props) => {
    if (props.name === "CONA") return "50px";
    else if (props.name === "EV6") return "50px";
  }};
  top: ${(props) => {
    if (props.name === "CONA") return "-30px";
    else if (props.name === "EV6") return "-35px";
  }};
`;

export const StyledImage = styled.div`
  background-image: url(${(props) => props.imageLink});
  display: flex;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 90%;
  background-size: contain;
  cursor: pointer;
  transition: background-image 0.3s ease;
  @media (max-width: 768px) {
    background-size: contain;
  }
  &:hover {
    background-image: url(${(props) => props.hoverimageLink});
  }
  margin-top: ${(props) => {
    if (props.name === "EV6") return "18px";
    else if (props.name === "BMW8 COUPE") return "18px";
  }};
  bottom: ${(props) => {
    if (props.name === "G-CLASS") return "-10px";
  }};
`;
