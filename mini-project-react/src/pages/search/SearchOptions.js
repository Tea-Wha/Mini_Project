import styled, {css} from "styled-components";
import {SearchContext} from "../../context/SearchStore";
import {useContext, useState} from "react";
import SearchOption from "./SearchOption";
import {Button, Slider, TextField} from "@mui/material";

const OptionsContainer = styled.div``

const OptionsBlock = styled.div`
		display: flex;
		position: relative;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 80vw;
		overflow: hidden;
`
const SliderContainer = styled.div`
		width: 90%;
    display: flex;
		align-items: center;
		justify-content: center;
    border-radius: 8px;
    margin: 10px;
    padding: 15px 30px;
    max-height: 0;
    opacity: 0;
		z-index: -1;
    overflow: hidden;
    transition: max-height 0.3s ease-in-out, transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
    transform: translateY(-300%);
    ${(props) =>
            props.visible &&
            css`
		            z-index: 0;
		            opacity: 1;
                border: 1px solid lightgray;
		            height: auto;
		            transform: translateY(0);
		            max-height: 1000px;
    `}
`
const SliderWidth = styled.div`
	width: 90%;
`

const SearchInput = styled(TextField)`
		width: 85%;
`

const SearchButton = styled(Button)`
		width: 15%;
`

const ToggleButton = styled(Button)`
		width: 100%;
		overflow: hidden;
`

const InputContainer = styled.div`
	display: flex;
    padding: 15px 30px;
		justify-content: center;
		align-items: center;
		width: 80%;
		margin: 10px auto;
		
`

const PriceSlider = styled(Slider)``

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
			value: 150000000,
			label: "1억5천만원"
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
					<SearchInput value={name} onChange={onChangeSearch} variant="outlined" size="small" />
					<SearchButton onClick={search} variant="outlined">검색</SearchButton>
				</InputContainer>
			</OptionsBlock>
			<OptionsBlock>
				<ToggleButton id="price" variant="outlined" onClick={e => {onToggleButton(e);
				onTogglePrice();}}>가격</ToggleButton>
				<SliderContainer visible={visible.price}>
					<SliderWidth>
						<PriceSlider
							value={[price.min, price.max]} // 슬라이더의 두 값을 설정
							onChange={onChangePrice} // 값 변경 처리
							valueLabelDisplay="auto" // 값 표시
							valueLabelFormat={value => `${value}`} // 값 포맷
							min={0} // 최소 값
							max={maxPrice?maxPrice:999999999} // 최대 값
							step={5000000} // 값 간격
							marks={marks} // 특정값 간격
							sx={{zIndex : 0}}
						/>
					</SliderWidth>
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