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
`
const Image = styled.img`
		width: 100%;
`

const CarOptionsContainer = styled.div`
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 20px 0 50px;
`


const CarInfoCustom = () => {
	
	const {options} = useContext(CarInfoContext)
	const [visible, setVisible] = React.useState({options: false})
	
	
	return (
		<AccordionComponent label="차량의 옵션들입니다." id="options" name="옵션들" visible={visible} setVisible={setVisible}>
			<CarOptionsContainer>
				{options && options.map((option, index) => (
						<Tooltip title={option.featureType} key={index}>
							<CarOptionContainer>
								{option.featureValue}
							</CarOptionContainer>
						</Tooltip>
				))}
			</CarOptionsContainer>
		</AccordionComponent>
	)
}
export default CarInfoCustom;