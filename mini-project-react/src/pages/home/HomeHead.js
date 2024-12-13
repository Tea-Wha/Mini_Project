import {useContext, useState} from "react";
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
import {UserContext} from "../../context/UserStore";

const HomeHead = () => {
  const { nickName } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subPageOpen, setSubPageOpen] = useState({
    brand: false,
    myPage: false,
  });

  const onClickMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onClickLogin = () => {
    setMenuOpen(true);
    setSubPageOpen({...subPageOpen, myPage: true});
  };
  // SubPageOpen 변경 필요 (SideMenu로 아예 독립시켜서 분리시켜놔서)
  // 로그인은 아예 로그인 페이지로 링크 시킬지도 고민해봐야함
  return (
    <Container>
      <NavContainer>
        <MenuContainer>
          <Button onClick={onClickMenu}>Menu</Button>
        </MenuContainer>
        <StyledLink to="/">
          <Initial>CHANAWA</Initial>
          {/* <img src="#" alt="Logo" /> */}
        </StyledLink>
        <Button onClick={onClickLogin}>{nickName ? "My Page" : "Login"}</Button>
      </NavContainer>
      <HomeImage />

      <HomeMenu
        setMenuOpen={setMenuOpen}
        subPageOpen={subPageOpen}
        setSubPageOpen={setSubPageOpen}
        menuOpen={menuOpen} // menuOpen 상태 추가
      />
    </Container>
  );
};
export default HomeHead;
