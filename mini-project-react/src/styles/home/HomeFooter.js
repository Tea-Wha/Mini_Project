import styled from "styled-components";

export const FootContainer = styled.div`
  // 위치 보여주기용
  width: 100vw;
  height: 200px;
  position: relative;
  bottom: 0;
  margin: 0 auto;
  background-color: #f0f0f0;
`;
export const Initial = styled.div`
  margin: 0 auto;
  color: black;
  margin-top: 0px;
  font-weight: bold;
  font-size: 1.6rem;
  display: flex;
  text-align: center;
  @font-face {
    font-family: "initial";
    src: url("/fonts/Blinker-ExtraBold.ttf") format("truetype");
  }
  font-family: "'initial', sans-serif";
`;
