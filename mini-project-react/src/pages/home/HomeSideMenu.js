import {
	FindGroup,
	MenuGroup,
	MenuItem,
	MenuItemSmall,
	MenuSideContainer,
} from "../../styles/home/HomeSideMenu";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { useEffect, useState } from "react";

const HomeSideMenu = ({ id, isSubOpen, idx }) => {
  const nickname = localStorage.getItem("nickname");
  const selector = () => {
    switch (id) {
      case "myPage":
        if (nickname) return "login";
        return "guest";
      case "brand":
        return "brand";
      default:
        console.log("코딩 에러");
        return null;
    }
  };

  const sideMenuList = [
    {
      name: "guest",
      content: [
        { name: "Log in", link: "/login" },
        { name: "Sign up", link: "/signup" },
        { half: true, content: [
					{name: "아이디 찾기", link: "/findId",},
		        { name: "비밀번호 찾기", link: "/findPw"},] },
        
      ],
    },
    {
      name: "login",
      content: [
        { name: nickname + "님 안녕하세요", link: "#", type: "text" },
        { name: "내 정보", link: "/myPage" },
        { name: "위시리스트 보기", link: "/wishList" },
        { name: "장바구니 보기", link: "/cart" },
      ],
    },
	  {
		  name: "brand",
		  content: [
			  { name: "Hyundai", link: "/brand/hyundai" },
			  { name: "Kia", link: "/brand/kia" },
			  { name: "BMW", link: "/brand/bmw" },
			  // 이 이후로 계속 추가
		  ],
	  },
  ];
  // Login 버튼 클릭 시 마이 페이지 까지 열리는 기능 코드 수정해야 합니다.
  // Login 버튼 클릭 시 메뉴 바에서 열리게 할지, 새로운 로그인 페이지 이동 할지 논의 필요
  return (
    <MenuSideContainer isSubOpen={isSubOpen} idx={idx}>
      <MenuGroup>
        {sideMenuList
          .filter((menu) => menu.name === selector())
          .map((menu) =>
            menu.content.map((menu) =>
	            menu.type === "text" ? (
									<p>{menu.name}</p>
								) : menu.half ? (
									<FindGroup>
										{menu.content.map((menu) => (
											<Link to={menu.link}>
												<MenuItemSmall key={menu.name}>{menu.name}</MenuItemSmall>
											</Link>
										))}
									</FindGroup>
								) : (
									<Link to={menu.link}>
										<MenuItem key={menu.name}>{menu.name}</MenuItem>
									</Link>
								)
            )
          )
				}
      </MenuGroup>
    </MenuSideContainer>
  );
};
export default HomeSideMenu;
