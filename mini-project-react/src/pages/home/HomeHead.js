import styled, {css} from "styled-components";
import {Link} from "react-router-dom";
import {useState} from "react";
import HomeMenu from "./HomeMenu";
import HomeImage from "./HomeImage";

const Container = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		// 크기 설정용
		width: 100%;
		height: 500px;
		// 영역 확인용
		background-color: bisque;
`

const NavContainer = styled.div`
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		// 크기 설정용
		width: 100%;
`
const MenuContainer = styled.div`
		display: flex;
		flex-direction: column;
`

const Button = styled.button`
		display: flex;
		justify-content: space-evenly;
		width: 150px;
		
`

const ImageCounterContainer = styled.div`
		width: 150px;
		margin: 0 auto;
		background-color: aquamarine;
`


const HomeHead = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const [myPageOpen, setMyPageOpen] = useState(false);
	
	
	const onClickMenu = () => {
		setMenuOpen(!menuOpen);
	}
	
	const onClickLogin = () => {
		setMenuOpen(true);
		setMyPageOpen(true);
	}
	
	
	return (
		<Container>
			<NavContainer>
				<MenuContainer>
					<Button onClick={onClickMenu}>Menu</Button>
				</MenuContainer>
				<Link to="/"><img src="#" alt="Logo"/></Link>
				<Button onClick={onClickLogin}>Login</Button>
			</NavContainer>
			<HomeImage/>
			{menuOpen && <HomeMenu setMenuOpen={setMenuOpen} myPageOpen={myPageOpen} setMyPageOpen={setMyPageOpen} />}
		</Container>
	)
}
export default HomeHead;