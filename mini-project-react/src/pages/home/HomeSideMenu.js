import {
	CloseButton,
	FindGroup,
	MenuGroup,
	MenuItem,
	MenuItemSmall,
	MenuSideContainer,
} from "../../styles/home/HomeMenu";
import {Link} from "react-router-dom";
import styled, {css} from "styled-components";
import {useEffect, useState} from "react";



const HomeSideMenu = ({id, isSubOpen}) => {
	const nickname = localStorage.getItem("nickname");
	const selector = () => {
		switch (id) {
			case "myPage":
				if(nickname) return "login"
				return "guest"
			case "brand":
				return "brand";
			default:
				console.log("코딩 에러")
				return null
		}
	}
	
	const sideMenuList = [
		{name: "guest",
		content: [
			{name: "Log in", link: "/login"},
			{name: "Sign up", link: "/signup"},
			{name: "아이디 찾기", link: "/findId", half:true},
			{name: "비밀번호 찾기", link: "/findPw", half:true},],},
		{name : "login",
		content: [
			{name: nickname + "님 안녕하세요", link: "#", type: "text"},
			{name: "내 정보", link: "/myPage"},
			{name: "위시리스트 보기", link: "/wishList"},
			{name: "장바구니 보기", link: "/cart"},
		],},
		{name: "brand",
			content: [
				{name: "Hyundai", link: "/brand/hyundai"},
				{name: "Kia", link: "/brand/kia"},
				{name: "BMW", link: "/brand/bmw"},
				// 이 이후로 계속 추가
			],},
	];
	
	
	
	
	
	
	return (
		<MenuSideContainer isSubOpen={isSubOpen}>
			{sideMenuList
				.filter((menu) => (menu.name === selector()))
				.map((menu) => (
					menu.content.map((menu) => (
						<Link to={menu.link}>
							{(menu.type==="text") ? <p>{menu.name}</p>:
								(menu.half) ? <MenuItemSmall key={menu.name}>{menu.name}</MenuItemSmall>:
									<MenuItem key={menu.name}>{menu.name}</MenuItem>}
						</Link>
					))
				))}
		</MenuSideContainer>
	)
}
export default HomeSideMenu;