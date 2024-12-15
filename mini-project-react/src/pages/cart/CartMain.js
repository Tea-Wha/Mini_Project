import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserStore";
import CartApi from "../../api/CartApi";
import styled from "styled-components";
import CartItem from "./CartItem";
import {useNavigate} from "react-router-dom";
import NavComponent from "../../components/NavComponent";
import Paper from "@mui/material/Paper";
import {Card} from "@mui/material";

const Container = styled.div`
		position: fixed;
	width: 100%;
		height: 100vh;
		background-color: #f5f5f5;
`

const CartContainer = styled(Card)`
		display: flex;
`
const PageContainer = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 50px auto;
		
`


const CartMain = () => {
	
	const [pageFlag, setPageFlag] = useState(false);
	
	const {userId, nickName} = useContext(UserContext)
	
	const [cart, setCart] = useState([])
	
	
	const navigate = useNavigate();
	
	useEffect(() => {
		const cartInitialFetch = async () => {
			try{
				const rsp = await CartApi.getCart(userId);
				console.log(rsp.data);
				setCart(rsp.data);
				console.log(cart);
			}
			catch(e){
				alert("카트 정보를 가져오는데 실패했습니다.")
				console.log(e);
			}
		}
		if (!userId) {
			alert("로그인이 되어있지 않습니다.");
			navigate("/login");
		}
		else cartInitialFetch()
	}, [userId, pageFlag]);
	
	
	return (
		<Container>
			<NavComponent color={true}/>
			<PageContainer>
				<h1>{nickName}님의 장바구니</h1>
				<CartContainer>
					{cart && cart.map((item, idx) => (
						<CartItem cart={item} key={idx} idx={idx} setPageFlag={setPageFlag} pageFlag={pageFlag}/>))}
				</CartContainer>
			</PageContainer>
		</Container>
	)
}

export default CartMain;