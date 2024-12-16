import React, {useContext} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import AccordionComponent from "../../components/AccordionComponent";

import {Tooltip} from "@mui/material";
import styled from "styled-components";
import Paper from "@mui/material/Paper";

const CarOptionContainer = styled(Paper)`
		width: 200px;
		overflow: hidden;
		padding: 10px 20px;
		margin: 20px 0;
		
`

const Div = styled.div`
	width: 100%;
		text-align: center;
`

const Blink = styled.div`
		width: 200px;
		padding: 10px 20px;
		margin: 20px 0;
		
`


const CarOptionsContainer = styled.div`
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		align-items: center;
		padding: 20px 0 50px;
`


const CarInfoCustom = () => {
	
	const {options} = useContext(CarInfoContext)
	
	console.log(options)
	
	const [visible, setVisible] = React.useState({options: false})
	
	
	return (
		<AccordionComponent label="차량의 옵션들입니다." id="options" name="옵션들" visible={visible} setVisible={setVisible}>
			<CarOptionsContainer>
				{options && Array.isArray(options) && options.length > 0 ? (
					options.map((option, index) => (
						<Tooltip title={option.featureType} key={index}>
							<CarOptionContainer sx={{backgroundColor: "#eeeeee"}}>
								{option.featureValue}
							</CarOptionContainer>
						</Tooltip>
					))
				) : (
					<Div>옵션이 존재하지 않습니다</Div>
				)}
				<Blink/><Blink/>
			</CarOptionsContainer>
		</AccordionComponent>
	);
}
	export default CarInfoCustom;