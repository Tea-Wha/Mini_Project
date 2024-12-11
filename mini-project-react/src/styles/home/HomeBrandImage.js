import styled from "styled-components";
import {Link} from "react-router-dom";

export const BrandImageButton = styled.fieldset`
  display: flex;
  flex-direction: row;
  position: relative;
  object-fit: contain;
  width: 23vw;
  height: 200px;
  border: 3px solid #f0f0f0;
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
  color: black;
  position: relative;
  margin-left: 10px;
`;

export const StyledLabel = styled.label`
  background-image: url(${(props) => props.logoimageLink});
  display: flex;
  position: absolute;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 80px;
  height: 40px;
  border-radius: 10px;
  right: 5px;
  top: -10px;
  z-index: 3;
  /* border: 1px solid black; */
`;

export const StyledImage = styled.div`
  background-image: url(${(props) => props.imageLink});
  display: flex;
  position: relative;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  height: 100%;
  border: none;
  background-size: cover;
  cursor: pointer;
  transition: background-image 0.3s ease;
  @media (max-width: 768px) {
    background-size: contain;
  }
  &:hover {
    background-image: url(${(props) => props.hoverimageLink});
  }
`;
