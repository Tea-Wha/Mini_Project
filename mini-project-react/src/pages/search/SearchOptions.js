import styled, {css} from "styled-components";
import {SearchContext} from "../../context/SearchStore";
import {useContext, useState} from "react";
import SearchOption from "./SearchOption";

const OptionsContainer = styled.div``

const OptionsBlock = styled.div``

const SearchButton = styled.button``

const ToggleButton = styled.button``

//https://mui.com/material-ui/react-slider/
const PriceSlider = styled.input`
	visibility: ${props => props.visible ? "visible" : "hidden"};
`

const SearchOptions = ({companies, engines, maxPrice, classList}) => {
	const {company, setCompany, engine, setEngine, price, setPrice, carClass, setCarClass } = useContext(SearchContext);
	
	const [visible, setVisible] = useState({
		company: false,
		price: false,
		engine: false,
		carClass: false,
	});
	
	const optionList =[
		{
			name: "제조사",
			id: "company",
			value: company,
			setter: setCompany,
			list: companies,
		},
		{
			name: "연료",
			id: "engine",
			value: engine,
			setter: setEngine,
			list: engines,
		},
		{
			name: "차종",
			id: "carClass",
			value: carClass,
			setter: setCarClass,
			list: classList,
		},
	]
	
	const onChangePrice = e => {
		setPrice(e.target.value);
	}
	
	const onToggleButton = e => {
		setVisible({...visible, [e.target.id]: !visible[e.target.id]});
	}
	
	return(
		<OptionsContainer>
			<OptionsBlock>
				<ToggleButton id="price" onClick={onToggleButton}>가격</ToggleButton>
				<PriceSlider value={[price.min, price.max]} onChange={onChangePrice} visible={visible.price}></PriceSlider>
			</OptionsBlock>
			{optionList.map((item,index) =>(
				<OptionsBlock key={index}>
					<ToggleButton id={item.id} onClick={onToggleButton}>{item.name}</ToggleButton>
					<SearchOption value={item.value} setter={item.setter} list={item.list} visible={visible[item.id]}/>
				</OptionsBlock>
			))}
		</OptionsContainer>
	)
}

export default SearchOptions