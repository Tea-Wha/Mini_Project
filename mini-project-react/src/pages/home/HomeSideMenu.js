import {
  FindGroup,
  MenuGroup,
  MenuItem,
  MenuItemSmall,
  MenuSideContainer,
  MenuLogo,
  StyledLink,
  MenuItemBrand,
} from "../../styles/home/HomeSideMenu";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";

const HomeSideMenu = ({ id, isSubOpen, idx }) => {
  const nickname = localStorage.getItem("nickName");

  const { logout } = useContext(UserContext);

  const sideMenuList = [
    {
      name: "guest",
      content: [
        { name: "Log in", link: "/login" },
        { name: "Sign up", link: "/join" },
        {
          half: true,
          content: [
            { name: "아이디 찾기", link: "/findId" },
            { name: "비밀번호 찾기", link: "/findPw" },
          ],
        },
      ],
    },
    {
      name: "login",
      content: [
        { name: nickname + "님 안녕하세요", link: "#", type: "text" },
        { name: "내 정보", link: "/myPage" },
        { name: "위시리스트 보기", link: "/wishList" },
        { name: "장바구니 보기", link: "/cart" },
        { name: "로그아웃", link: "/", onclick: { logout } },
      ],
    },
    {
      name: "brand",
      content: [
        {
          name: "HYUNDAI",
          link: "/brand/hyundai",
          logoImageLink: "/testlogos/HYUNDAI.png",
          featured: true,
        },
        {
          name: "KIA",
          link: "/brand/kia",
          logoImageLink: "/testlogos/KIA.png",
          featured: true,
        },
        {
          name: "GENESIS",
          link: "/brand/genesis",
          logoImageLink: "/testlogos/GENESIS.png",
          featured: true,
        },
        {
          name: "BENZ",
          link: "/brand/benz",
          logoImageLink: "/testlogos/BENZ.png",
          featured: true,
        },
        {
          name: "BMW",
          link: "/brand/bmw",
          logoImageLink: "/testlogos/BMW.png",
          featured: true,
        },
        {
          name: "AUDI",
          link: "/brand/audi",
          logoImageLink: "/testlogos/AUDI.png",
          featured: true,
        },
        {
          name: "VOLKSWAGEN",
          link: "/brand/volkswagen",
          logoImageLink: "/testlogos/VOLKSWAGEN.png",
          featured: true,
        },
        {
          name: "PORSCHE",
          link: "/brand/porshe",
          logoImageLink: "/testlogos/PORSCHE.png",
          featured: true,
        },
        {
          name: "HONDA",
          link: "/brand/honda",
          logoImageLink: "/testlogos/HONDA.png",
          featured: true,
        },
        {
          name: "TOYOTA",
          link: "/brand/toyota",
          logoImageLink: "/testlogos/TOYOTA.png",
          featured: true,
        },
        {
          name: "LEXUS",
          link: "/brand/lexus",
          logoImageLink: "/testlogos/LEXUS.png",
          featured: true,
        },
        {
          name: "JEEP",
          link: "/brand/jeep",
          logoImageLink: "/testlogos/JEEP.png",
          featured: true,
        },
        {
          name: "FORD",
          link: "/brand/ford",
          logoImageLink: "/testlogos/FORD.png",
          featured: true,
        },
        {
          name: "CHEVROLET",
          link: "/brand/chevrolet",
          logoImageLink: "/testlogos/CHEVROLET.png",
          featured: true,
        },
        {
          name: "TESLA",
          link: "/brand/tesla",
          logoImageLink: "/testlogos/TESLA.png",
          featured: true,
        },
        {
          name: "LAMBORGHINI",
          link: "/brand/lamborghini",
          logoImageLink: "/testlogos/LAMBORGHINI.png",
          featured: true,
        },
        {
          name: "FERRARI",
          link: "/brand/ferrari",
          logoImageLink: "/testlogos/FERRARI.png",
          featured: true,
        },
        {
          name: "MASERATI",
          link: "/brand/maserati",
          logoImageLink: "/testlogos/MASERATI.png",
          featured: true,
        },
        {
          name: "PAGANI",
          link: "/brand/pagani",
          logoImageLink: "/testlogos/PAGANI.png",
          featured: true,
        },
        {
          name: "LANDROVER",
          link: "/brand/landrover",
          logoImageLink: "/testlogos/LANDROVER.png",
          featured: true,
        },
        {
          name: "JAGUAR",
          link: "/brand/jaguar",
          logoImageLink: "/testlogos/JAGUAR.png",
          featured: true,
        },
        {
          name: "ROLLSROYCE",
          link: "/brand/rollsroyce",
          logoImageLink: "/testlogos/ROLLSROYCE.png",
          featured: true,
        },
        {
          name: "BENTLEY",
          link: "/brand/bentley",
          logoImageLink: "/testlogos/BENTLEY.png",
          featured: true,
        },
        {
          name: "ASTONMARTIN",
          link: "/brand/astonmartin",
          logoImageLink: "/testlogos/ASTONMARTIN.png",
          featured: true,
        },
        {
          name: "MINI",
          link: "/brand/mini",
          logoImageLink: "/testlogos/MINI.png",
          featured: true,
        },
        {
          name: "VOLVO",
          link: "/brand/volvo",
          logoImageLink: "/testlogos/VOLVO.png",
          featured: true,
        },
        {
          name: "PEUGEOT",
          link: "/brand/peugeot",
          logoImageLink: "/testlogos/PEUGEOT.png",
          featured: true,
        },
        {
          name: "RENAULT",
          link: "/brand/renault",
          logoImageLink: "/testlogos/RENAULT.png",
          featured: true,
        },
        {
          name: "BUGATTI",
          link: "/brand/bugatti",
          logoImageLink: "/testlogos/BUGATTI.png",
          featured: true,
        },
        // 이 이후로 계속 추가
      ],
    },
  ];

  const selector = () => {
    switch (id) {
      case "myPage":
        return nickname ? "login" : "guest";
      case "brand":
        return "brand";
      default:
        console.error("Invalid ID");
        return null;
    }
  };

  useEffect(() => {
    document.body.style.overflow =
      id === "brand" && isSubOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [id, isSubOpen]);

  const renderMenuContent = (menu) => {
    const filteredContent = menu.content.filter(
      (item) => item.name !== "로그아웃"
    );
    const lastItemIndex = filteredContent.length - 1;

    return filteredContent.map((item, index) => {
      if (item.type === "text") {
        return <p key={item.name}>{item.name}</p>;
      }

      if (item.half) {
        return (
          <FindGroup key={item.name}>
            {item.content.map((subItem) => (
              <Link to={subItem.link} key={subItem.name}>
                <MenuItemSmall isSubOpen={isSubOpen}>
                  {subItem.name}
                </MenuItemSmall>
              </Link>
            ))}
          </FindGroup>
        );
      }

      if (item.featured) {
        return (
          <StyledLink to={item.link} key={item.name}>
            <MenuItemBrand isSubOpen={isSubOpen}>
              {item.name}
              <MenuLogo isSubOpen={isSubOpen} logo={item.logoImageLink} />
            </MenuItemBrand>
          </StyledLink>
        );
      }

      return (
        <>
          <Link to={item.link} key={item.name}>
            <MenuItem isSubOpen={isSubOpen}>{item.name}</MenuItem>
          </Link>
          {index === lastItemIndex && (
            <MenuItem
              as="button"
              onClick={logout}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              로그아웃
            </MenuItem>
          )}
        </>
      );
    });
  };

  const selectedMenu = sideMenuList.find((menu) => menu.name === selector());

  return (
    <MenuSideContainer isSubOpen={isSubOpen} idx={idx}>
      <MenuGroup isSubOpen={isSubOpen}>
        {selectedMenu ? renderMenuContent(selectedMenu) : null}
      </MenuGroup>
    </MenuSideContainer>
  );
};
export default HomeSideMenu;
