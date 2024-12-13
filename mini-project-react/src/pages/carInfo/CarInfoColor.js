import React, {useContext} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import AccordionComponent from "../../components/AccordionComponent";

import {Tooltip} from "@mui/material";
import styled from "styled-components";

const ImageContainer = styled.div`
		width: 100px;
		height: 75px;
		overflow: hidden;
		margin: 20px 0 50px;
		border-radius: 8px;
		
`
const Image = styled.img`
		width: 100%;
		height: 100%; /* 부모의 높이도 채움 */
		object-fit: cover;
`

const ColorsContainer = styled.div`
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		
`

const ColorChip = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ color }) => color}; /* color 값을 배경색으로 설정 */
    position: relative; /* ::after의 위치를 위한 relative positioning */

    &::after {
        content: ""; /* 내용은 빈 문자열 */
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(-40deg, transparent 35%, rgba(255, 255, 255, .25) 55%, transparent 75%); /* 그라데이션 배경 */
        pointer-events: none; /* 그라데이션이 클릭되지 않도록 */
    }
`;


const CarInfoColor = () => {
	

	const {colors} = useContext(CarInfoContext)
	const [visible, setVisible] = React.useState({color: false})
	console.log(colors)
	
	return (
		<AccordionComponent label="차량의 색상들입니다." id="color" name="색상" visible={visible} setVisible={setVisible}>
			<ColorsContainer>
				{colors && colors.map((color, index) => (
					<Tooltip title={color.colorName} key={index}>
						<ImageContainer>
							{color.colorUrl.includes("txt") ? <ColorChip color={color.colorUrl.replace(".txt", "")} /> : <Image src={color.colorUrl} alt={color.colorName}/>}
						</ImageContainer>
					</Tooltip>
				))}
			</ColorsContainer>
		</AccordionComponent>
	)
}
export default CarInfoColor