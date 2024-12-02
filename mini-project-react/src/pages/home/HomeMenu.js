import { Link } from "react-router-dom";
import {
  CloseButton,
  MenuContainer,
  MenuGroup,
  MenuItem,
} from "../../styles/home/HomeMenu";
import HomeSideMenu from "./HomeSideMenu";
import { useState } from "react";

// 부모 클래스에서 값을 알기 위해 부모에서 useState생성후 props로 내려줌
// myPageOpen 은 마이페이지부분 열기
// menuOpen 은 메뉴 전체부분 열기
const HomeMenu = ({ setMenuOpen, subPageOpen, setSubPageOpen, menuOpen }) => {
  const menuList = [
    { name: "Search", link: "/search" },
    { name: "Customizing", link: "/estimate" },
  ];

  const toggleList = [
    { name: "Brand", id: "brand" },
    { name: "My Page", id: "myPage" },
  ];

  const onClickToggle = (e) => {
    setSubPageOpen({
      ...{ myPage: false, brand: false },
      [e.target.id]: !subPageOpen[e.target.id],
    });
  };

  const onClickClose = () => {
    setMenuOpen(false);
    setSubPageOpen({ myPage: false, brand: false });
  };
  // SideContainer로 따로 빼서 추가적인 작업 수월하게끔 변경 예정 (진행중)
  // 브랜드 쪽 SideContainer는 스크롤 추가해서 전체 브랜드 대표 차 진열 예정
  return (
    <>
      <MenuContainer isOpen={menuOpen}>
        <MenuGroup>
          {menuList.map((menu) => (
            <Link to={menu.link}>
              <MenuItem key={menu.name}>{menu.name}</MenuItem>
            </Link>
          ))}
          {toggleList.map((menu) => (
            <MenuItem
              key={menu.id}
              id={menu.id}
              onClick={onClickToggle}
              isSubOpen={subPageOpen[menu.id]}
            >
              {menu.name}
            </MenuItem>
          ))}
        </MenuGroup>
        {toggleList.map((menu) => (
          <HomeSideMenu
            key={menu.id}
            id={menu.id}
            isSubOpen={subPageOpen[menu.id]}
          />
        ))}
        <CloseButton onClick={onClickClose}> X </CloseButton>
      </MenuContainer>
    </>
  );
};

export default HomeMenu;
