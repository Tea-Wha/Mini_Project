import {useContext, useState} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import styled from "styled-components";
import AccordionComponent from "../../components/AccordionComponent";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, Tooltip} from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {ShoppingCartCheckout} from "@mui/icons-material";
import {priceFormatter} from "../../Formatter";

const PriceContainer = styled.div`
		display: flex;
		justify-content: center;
		align-items: flex-start;
		position: fixed;
		right: 0;
		bottom: 0;
`



const CustomizeResult = ({onClickSubmit, updateFlag}) => {
	const [visible, setVisible] = useState({result:true});
	
	const {carPrice} = useContext(CarInfoContext);
	
	const totalPrice = Array.isArray(carPrice)
		? carPrice.reduce((sum, item) => sum + (item.price || 0), 0)
		: 0;
	
	
	
	return (
		<PriceContainer>
			<Tooltip title={updateFlag ? `수정하기`:`추가하기`}>
				<IconButton onClick={onClickSubmit} sx={{marginRight: 2}}>{updateFlag ? <ShoppingCartCheckout/> : <AddShoppingCartIcon/>}</IconButton>
			</Tooltip>
			<AccordionComponent name={`총 가격 : ${priceFormatter(totalPrice)}`} id="result" label="선택하신 요소별 금액입니다." visible={visible} setVisible={setVisible} reversed={true}>
				<Table>
				<TableHead>
					<TableRow>
						<TableCell>요소</TableCell>
						<TableCell>가격</TableCell>
					</TableRow>
				</TableHead>
				</Table>
				<TableBody>
					{carPrice.map((item, index) => (
						<TableRow key={index}>
							<TableCell>
								{item.name}
							</TableCell>
							<TableCell>
								{priceFormatter(item.price)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</AccordionComponent>
			
		</PriceContainer>
	)
}

export default CustomizeResult