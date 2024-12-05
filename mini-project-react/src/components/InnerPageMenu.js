import styled from "styled-components";
import {useState} from "react";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const MenuContainer = styled.div``
const MenuGroup = styled.div``
const MenuItem = styled(Button)``
const CloseButton = styled(Button)``




const HomeMenu = () => {
	const [subOpen, setSub] = useState(null);
	
	const menuList = [
		{name: "Search", link: "/search"},
		{name: "Customizing", link: "/estimate"},
	];
	
	const toggleList = [
		{name: "Brand", id: "brand"},
		{name: "My Page", id: "myPage"},
	];
	
	const onClickToggle = (e) => {
		setSubOpen({
			...{myPage: false, brand: false},
			[e.target.id]: !subPageOpen[e.target.id],
		});
	};
	
	const onClickClose = () => {
		setMenuOpen(false);
		setSubOpen({myPage: false, brand: false});
	};
	
	return (
		<>
			<MenuContainer subOpen={subOpen}>
				<MenuGroup>
					{menuList.map((menu) => (
						<MenuItem key={menu.name}>
							<Link to={menu.link}>{menu.name}</Link>
						</MenuItem>
					))}
					{toggleList.map((menu) => (
						<MenuItem
							key={menu.id}
							id={menu.id}
							onClick={onClickToggle}
							isSubOpen={subOpen[menu.id]}
						>
							{menu.name}
						</MenuItem>
					))}
				</MenuGroup>
				{toggleList.map((menu, idx) => (
					<HomeSideMenu
						idx={idx}
						key={menu.id}
						id={menu.id}
						isSubOpen={subOpen[menu.id]}
					/>
				))}
				<CloseButton onClick={onClickClose}> X </CloseButton>
			</MenuContainer>
		</>
	);
};

export default HomeMenu;
