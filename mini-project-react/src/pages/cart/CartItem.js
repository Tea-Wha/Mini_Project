import styled from "styled-components";
import AccordionComponent from "../../components/AccordionComponent";
import {useContext, useEffect, useState} from "react";
import CartTable from "./CartTable";
import {Card, IconButton, TextField, Tooltip} from "@mui/material";
import ConfirmModal from "../../components/ConfirmModal";
import CartApi from "../../api/CartApi";
import {CarInfoContext} from "../../context/CarInfoStore";
import {useNavigate} from "react-router-dom";
import {Edit, EditOff, RemoveShoppingCart, ShoppingCartCheckout} from "@mui/icons-material";
import {priceFormatter} from "../../Formatter";

const PriceContainer = styled.div`
	font-weight: bold;
		font-size: 1.2em;
		margin: 10px auto;
`

const CartItemContainer = styled(Card)`
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		width: 300px;
		margin: 10px;
`

const CartImage = styled.img`
	width: 90%;
		margin: 10px auto;
`

const CartNumberContainer = styled.div`
	display: flex;
		width: 90%;
		justify-content: center;
		align-items: center;
		margin: 10px auto;
`

const CartButtonContainer = styled.div`
	display: flex;
		justify-content: space-evenly;
		width: 100%;
		margin: 10px auto;
`


const NameInput = styled(TextField)`
	width: 200px;
	display: flex;
		border: 2px solid lightgray;
`


const CartItem = ({ cart, pageFlag, setPageFlag }) => {
	const [cartName, setCartName] = useState("")
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const [nameOpen, setNameOpen] = useState(false)
	
	const navigate = useNavigate();
	
	const [visible, setVisible] = useState({ table: false });
	
	const {setCarColor, setCarOptions, setCartNo} = useContext(CarInfoContext)
	
	useEffect(() => {
		setCartName(cart.cartName)
	}, [cart]);
	
	const onClickDelete = () => {
		setIsModalOpen(true);
	};
	const onClickEdit = () => {
		setCarColor(cart.carColor);
		setCarOptions(cart.carOptions);
		setCartNo(cart.cartNo);
		navigate(`/customize/${cart.carNo}/true`)
	}
	
	const onClickNameEdit = async () => {
		try {
			const rsp = await CartApi.nameChange(cartName, cart.cartNo);
			console.log(rsp)
			if(rsp.data) console.log("이름 변경 성공")
			else console.log("이름 변경 실패")
			setNameOpen(false)
		}
		catch (e) {
			console.log("통신 실패")
			console.log(e)
		}
	}
	const onClickNameClear = () => {
		console.log(cartName)
		setCartName(cart.cartName)
		setNameOpen(false)
	}
	
	
	const confirmDelete = async () => {
		try {
			const rsp = await CartApi.deleteCart(cart.cartNo);
			if(rsp.data){
				setIsModalOpen(false);
				console.log("삭제되었습니다.");
				alert("견적이 삭제되었습니다.")
				setPageFlag(!pageFlag);
			}
			else{
				console.log("삭제에 실패했습니다.")
				alert("삭제에 실패했습니다.")
			}
		} catch (e) {
			alert("삭제중 오류가 발생하였습니다.")
			console.log(e);
		}
	};
	
	const cancelDelete = () => {
		setIsModalOpen(false);
		console.log("삭제가 취소되었습니다.");
	};
	
	const onChangeName = (e) => {
		setCartName(e.target.value);
	}
	
	return (
		<CartItemContainer>
			{isModalOpen && (
				<ConfirmModal
					message="정말 삭제하시겠습니까?"
					onConfirm={confirmDelete}
					onCancel={cancelDelete}
				/>
			)}
			<CartNumberContainer>
				{nameOpen ? <NameInput onChange={onChangeName} value={cartName}/> : <NameInput value={cartName} disabled/>}
				{nameOpen ?
					<><IconButton onClick={onClickNameEdit}><Edit/></IconButton>
						<IconButton onClick={onClickNameClear}><EditOff/></IconButton></> :
					<IconButton onClick={() => {setNameOpen(true)}}><Edit/></IconButton>}
			</CartNumberContainer>
			<CartImage src={cart.cartUrl} />
			<PriceContainer>
				가격 : {priceFormatter(cart.cartPrice)}
			</PriceContainer>
			<AccordionComponent
				label="차량의 세부 견적입니다."
				visible={visible}
				setVisible={setVisible}
				id="table"
				name="세부 견적"
			>
				<CartTable cart={cart} />
			</AccordionComponent>
			<CartButtonContainer>
				<Tooltip title={"수정하기"}>
					<IconButton onClick={onClickEdit}><ShoppingCartCheckout/></IconButton>
				</Tooltip>
				<Tooltip title={"삭제하기"}>
					<IconButton onClick={onClickDelete}><RemoveShoppingCart/></IconButton>
				</Tooltip>
			</CartButtonContainer>
		</CartItemContainer>
	);
};


export default CartItem;