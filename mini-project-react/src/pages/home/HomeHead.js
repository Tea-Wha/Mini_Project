import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
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
  const [myPageOpen, setMyPageOpen] = useState(false);

  const onClickMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onClickLogin = () => {
    setMenuOpen(true);
    setMyPageOpen(true);
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
      {menuOpen && (
        <HomeMenu
          setMenuOpen={setMenuOpen}
          myPageOpen={myPageOpen}
          setMyPageOpen={setMyPageOpen}
        />
      )}
    </Container>
  );
};
export default HomeHead;
