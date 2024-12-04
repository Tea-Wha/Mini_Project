import styled, {css} from "styled-components";
import {SearchContext} from "../../context/SearchStore";
import {useContext, useState} from "react";
import SearchOption from "./SearchOption";
import {Slider} from "@mui/material";

const OptionsContainer = styled.div``

const OptionsBlock = styled.div``

const SearchInput = styled.input``

const SearchButton = styled.button``

const ToggleButton = styled.button``


const PriceSlider = styled(Slider)`
	visibility: ${props => props.visible ? "visible" : "hidden"};
`

const SearchOptions = ({companies, engines, maxPrice, classList, search}) => {
	const {name, setName, company, setCompany, engine, setEngine, price, setPrice, carClass, setCarClass } = useContext(SearchContext);
	
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
	const onChangeSearch = e => {
		setName(e.target.value);
	}
	
	const onChangePrice = (event, newValue) => {
		setPrice({
			...price,
			min: newValue[0], // min 값 업데이트
			max: newValue[1], // max 값 업데이트
		});
	};
	
	const onToggleButton = e => {
		setVisible({...visible, [e.target.id]: !visible[e.target.id]});
	}
	const onTogglePrice = () => {
		setPrice({...price, isPrice: !price.isPrice});
	}
	
	return(
		<OptionsContainer>
			<OptionsBlock>
				<SearchInput value={name} onChange={onChangeSearch} />
				<SearchButton onClick={search}>검색</SearchButton>
			</OptionsBlock>
			<OptionsBlock>
				<ToggleButton id="price" onClick={e => {onToggleButton(e);
				onTogglePrice();}}>가격</ToggleButton>
				<PriceSlider
					value={[price.min, price.max]} // 슬라이더의 두 값을 설정
					onChange={onChangePrice} // 값 변경 처리
					valueLabelDisplay="auto" // 값 표시
					valueLabelFormat={value => `${value}`} // 값 포맷
					min={0} // 최소 값
					max={maxPrice?maxPrice:999999999} // 최대 값
					step={1000000} // 값 간격
					visible={visible.price} // 가시성 prop 전달
				/>
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