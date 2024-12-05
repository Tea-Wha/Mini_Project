import styled, {css} from "styled-components";
import {SearchContext} from "../../context/SearchStore";
import {useContext, useState} from "react";
import SearchOption from "./SearchOption";
import {Button, Input, Slider} from "@mui/material";

const OptionsContainer = styled.div``

const OptionsBlock = styled.div`
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 80vw;
		
`
const SliderContainer = styled.div`
    width: 80%;
		
		
`

const SearchInput = styled(Input)``

const SearchButton = styled(Button)``

const ToggleButton = styled(Button)`
		width: 100%;
`

const InputContainer = styled.div``

const PriceSlider = styled(Slider)`
		transition: display ;
		
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
	
	const marks = [
		{
			value: 0,
			label: "0원"
		},
		{
			value: 30000000,
			label: "3천만원"
		},
		{
			value: 60000000,
			label: "6천만원"
		},
		{
			value: 100000000,
			label: "1억원"
		},
		{
			value: 200000000,
			label: "2억원"
		}
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
		console.log(visible)
		setVisible({...visible, [e.target.id]: !visible[e.target.id]});
	}
	
	const onTogglePrice = () => {
		setPrice({...price, isPrice: !price.isPrice});
	}
	
	return(
		<OptionsContainer>
			<OptionsBlock>
				<InputContainer>
					<SearchInput value={name} onChange={onChangeSearch} variant="outlined" />
					<SearchButton onClick={search} variant="outlined">검색</SearchButton>
				</InputContainer>
			</OptionsBlock>
			<OptionsBlock>
				<ToggleButton id="price" variant="outlined" onClick={e => {onToggleButton(e);
				onTogglePrice();}}>가격</ToggleButton>
				<SliderContainer>
					<PriceSlider
						value={[price.min, price.max]} // 슬라이더의 두 값을 설정
						onChange={onChangePrice} // 값 변경 처리
						valueLabelDisplay="auto" // 값 표시
						valueLabelFormat={value => `${value}`} // 값 포맷
						min={0} // 최소 값
						max={maxPrice?maxPrice:999999999} // 최대 값
						step={5000000} // 값 간격
						marks={marks} // 특정값 간격
						sx={{ display: visible.price ? "flex" : "none" }} // 가시성 prop 전달
					/>
				</SliderContainer>
			</OptionsBlock>
			{optionList.map((item,index) =>(
				<OptionsBlock key={index}>
					<ToggleButton id={item.id} variant="outlined" onClick={onToggleButton}>{item.name}</ToggleButton>
					<SearchOption value={item.value} setter={item.setter} list={item.list} visible={visible[item.id]}/>
				</OptionsBlock>
			))}
		</OptionsContainer>
	)
}

export default SearchOptions