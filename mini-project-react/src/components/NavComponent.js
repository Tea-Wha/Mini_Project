import {Button, Initial, MenuContainer, NavContainer, StyledLink} from "../styles/home/HomeHead";
import {useContext, useState} from "react";
import {UserContext} from "../context/UserStore";
import HomeMenu from "../pages/home/HomeMenu";

const NavComponent = ({color}) => {
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
		setSubPageOpen({ ...subPageOpen, myPage: true });
	};
	
	
	return(
		<>
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
			<HomeMenu
				setMenuOpen={setMenuOpen}
				subPageOpen={subPageOpen}
				setSubPageOpen={setSubPageOpen}
				menuOpen={menuOpen} // menuOpen 상태 추가
			/>
		</>
	)
}
export default NavComponent;
