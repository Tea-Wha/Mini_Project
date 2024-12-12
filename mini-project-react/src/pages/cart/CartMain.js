import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../context/UserStore";
import CartApi from "../../api/CartApi";
import styled from "styled-components";
import CartItem from "./CartItem";

const CartContainer = styled.div`
		display: flex;
		background-color: bisque;
`


const CartMain = () => {
	
	const {userId} = useContext(UserContext)
	
	const [cart, setCart] = useState([])
	
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
		cartInitialFetch()
	}, [userId]);
	
	
	return (
		<CartContainer>
			{cart && cart.map((item, idx) => (<CartItem cart={item} key={idx}/>))}
		</CartContainer>
	)
}

export default CartMain;