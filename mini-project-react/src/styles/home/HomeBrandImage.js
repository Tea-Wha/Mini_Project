import styled from "styled-components";
import { Link } from "react-router-dom";

export const BrandImageButton = styled.button`
  background-image: url(${(props) => props.imageLink});
  display: flex;
  flex-direction: row;
  position: relative;
  object-fit: cover;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  width: 23vw;
  height: 240px;
  border: 3px solid white;
  border-radius: 10px;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: background-image 0.3s ease;
  &:hover {
    background-image: url(${(props) => props.hoverimageLink});
  }
`;
// 위치 및 화면 조정에 따른 component 어떻게 처리할지 논의 필요
export const StyledLink = styled(Link)`
  text-decoration: none;
  display: flex;
  flex-direction: row;
  position: relative;
`;
