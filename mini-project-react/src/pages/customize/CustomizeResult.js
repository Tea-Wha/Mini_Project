import {useContext, useState} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import styled from "styled-components";
import AccordionComponent from "../../components/AccordionComponent";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";


const PriceContainer = styled.div`
		display: flex;
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
		position: fixed;
		right: 0;
		bottom: 0;
		
`



const CustomizeResult = () => {
	const [visible, setVisible] = useState({result:true});
	
	const {carPrice} = useContext(CarInfoContext);
	
	const totalPrice = Array.isArray(carPrice)
		? carPrice.reduce((sum, item) => sum + (item.price || 0), 0)
		: 0;
	
	
	return (
		<PriceContainer>
			<AccordionComponent name={`총 가격 : ${totalPrice}`} id="result" label="선택하신 요소별 금액입니다." visible={visible} setVisible={setVisible} reversed={true}>
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
								{item.price}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</AccordionComponent>
			
		</PriceContainer>
	)
}

export default CustomizeResult