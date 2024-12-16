import styled, { css } from "styled-components";
import { Swiper } from "swiper/react";

export const Styleddiv = styled.div`
  display: flex;
  position: relative;
  width: 100vw;
  height: 100%;
  z-index: 5;
`;

export const ImageContainer = styled.div`
  background-image: url(${(props) => props.imageLink});
  object-fit: cover;
  justify-content: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  width: 100vw;
  height: 100%;
  position: relative;
  z-index: 5;
  flex-shrink: 0;
`;
export const PauseButton = styled.button`
  background-color: pink;
  width: 15px;
  height: 15px;
  position: relative;
  margin-left: 10px;
  margin-top: 17px;
  display: flex;
  border: none;
  cursor: pointer;
  z-index: 50;
  /* display: ${(props) => (props.isPlaying ? "flex" : "none")}; */
  &::before {
    content: "";
    position: absolute;
    top: 6px;
    left: -4px;
    width: 15px;
    height: 3px;
    border-radius: 10px;
    background-color: black;
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
  margin-bottom: 17px;
  margin-left: 10px;
  display: flex;
  position: relative;
  border: none;
  cursor: pointer;
  z-index: 5;
  /* display: ${(props) => (props.isPlaying ? "none" : "flex")}; */
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

export const StyledSwiper = styled(Swiper)`
  width: 100vw;
  height: 100%;
  display: flex;
  position: relative;

  .swiper-pagination-bullet {
    background: white;
    width: 13px;
    height: 13px;
    pointer-events: auto;
    opacity: 1;
    margin: 0 20px;
  }

  .swiper-pagination-bullet-active {
    background: black;
  }
  .swiper-pagination {
    display: flex;
    bottom: 20px;
    z-index: 50;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }
  .swiper {
    display: flex;
    position: relative;
    width: 100vw;
    height: 100%;
    z-index: 10;
  }
  .swiper-slide {
    display: flex;
  }
`;
