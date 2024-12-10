import styled from "styled-components";
import AccordionComponent from "../../components/AccordionComponent";
import {useContext, useState} from "react";
import CarInfoTable from "../carInfo/CarInfoTable";
import {CarInfoContext} from "../../context/CarInfoStore";
import OptionComponent from "../../components/OptionComponent";

const OptionsContainer = styled.div`
		position: absolute;
		display: flex;
		flex-direction: column;
		right: 0;
		top: 0;
		width: 30%;
		height: 100%;
`

const CustomizeOptions =() => {
	
	const [visible, setVisible] = useState({
		color: false, option: false, table: false
	});
	window.localStorage.clear()
	const {colors, options ,carColor, setCarColor, carOptions, setOptions} = useContext(CarInfoContext);
	
	const seletor = [
		{name: "색상",
		id: "color",
		list: colors,
		value: carColor,
		setter: setCarColor},
		{name: "옵션",
		id: "options",
		list: options,
		value: carOptions,
		setter: setOptions,},
	]
	
	
	
	
	
	
	return(
		<OptionsContainer>
			{seletor.map((item, index) => (
				<AccordionComponent key={index} label={`선택하실 ${item.name}을 선택하세요.`} id={item.id} name={item.name} visible={visible} setVisible={setVisible}>
					<OptionComponent list={item.list} value={item.value} setter={item.setter} id={item.id} visible={visible} setVisible={setVisible}/>
				</AccordionComponent>
			))}
			<AccordionComponent label={`실제 차량과 다를수 있습니다.`} id="table" name="재원 정보" visible={visible} setVisible={setVisible}>
				<CarInfoTable/>
			</AccordionComponent>
		</OptionsContainer>
	)
}

export default CustomizeOptions