import {useState} from "react";
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

const HomeHead = () => {
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
    setSubPageOpen(true);
  };

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
        <Button onClick={onClickLogin}>Login</Button>
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
