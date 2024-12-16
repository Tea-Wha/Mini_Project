import { useContext, useState } from "react";
import HomeMenu from "./HomeMenu";
import HomeImage from "./HomeImage";
import {
  Container,
  NavContainer,
  MenuContainer,
  Button,
  ImageCounterContainer,
  Initial,
  StyledLink,
} from "../../styles/home/HomeHead";
import { UserContext } from "../../context/UserStore";
import HomeImageRev from "./HomeImageRev";
import NavComponent from "../../components/NavComponent";

const HomeHead = () => {
  
  // SubPageOpen 변경 필요 (SideMenu로 아예 독립시켜서 분리시켜놔서)
  // 로그인은 아예 로그인 페이지로 링크 시킬지도 고민해봐야함
  return (
    <Container>
      <NavComponent />
      <HomeImageRev />
    </Container>
  );
};
export default HomeHead;
