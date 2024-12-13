import styled from "styled-components";
import AccordionComponent from "../../components/AccordionComponent";
import {useContext, useEffect, useState} from "react";
import CartTable from "./CartTable";
import {IconButton, TextField} from "@mui/material";
import ConfirmModal from "../../components/ConfirmModal";
import CartApi from "../../api/CartApi";
import {CarInfoContext} from "../../context/CarInfoStore";
import {useNavigate} from "react-router-dom";
import {Edit, EditOff, RemoveShoppingCart, ShoppingCartCheckout} from "@mui/icons-material";

const CartItemContainer = styled.div`
		display: flex;
		flex-direction: column;
		align-items: center;
`

const CartImage = styled.img``

const CartNumberContainer = styled.div``

const CartButtonContainer = styled.div``

const NameContainer = styled.div``

const NameInput = styled(TextField)`

`


const CartItem = ({ cart, pageFlag, setPageFlag }) => {
	const [cartName, setCartName] = useState("")
	
	const [isModalOpen, setIsModalOpen] = useState(false);
	
	const [nameOpen, setNameOpen] = useState(false)
	
	const navigate = useNavigate();
	
	const [visible, setVisible] = useState({ table: false });
	
	const {setCarColor, setCarOptions} = useContext(CarInfoContext)
	
	useEffect(() => {
		setCartName(cart.cartName)
	}, [cart]);
	
	const onClickDelete = () => {
		setIsModalOpen(true);
	};
	
	const onClickEdit = () => {
		setCarColor(cart.carColor);
		setCarOptions(cart.carOptions);
		navigate(`customize/${cart.carNo}/true`)
	}
	
	const onClickNameEditToggle = () => {
		setNameOpen(!nameOpen);
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
				{nameOpen ? <NameInput></NameInput> : <NameContainer onChange={onChangeName} value={cartName}>{cart.cartName}</NameContainer>}
				<IconButton onClick={onClickNameEditToggle}>
					{nameOpen ? <EditOff/> :<Edit/>}
				</IconButton>
			</CartNumberContainer>
			<CartImage src={cart.url} />
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
				<IconButton onClick={onClickEdit}><ShoppingCartCheckout/></IconButton>
				<IconButton onClick={onClickDelete}><RemoveShoppingCart/></IconButton>
			</CartButtonContainer>
		</CartItemContainer>
	);
};


export default CartItem;