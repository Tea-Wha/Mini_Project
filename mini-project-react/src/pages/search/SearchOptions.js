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
// 자연스러운 애니메이션을 위해 추가
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
	width: 80%;
		margin: 10px;
`

const SearchInput = styled(TextField)`
		width: 85%;
`

const SearchButton = styled(Button)`
		width: 15%;
`

const CloseButton = styled(Button)`
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
// 검색 옵션을 위한 세개의 리스트와 최대 금액 그리고 검색버튼 클릭시 검색하기 위한 search 함수
const SearchOptions = ({companies, engines, maxPrice, classList, search}) => {
	// 전역 상태관리
	const {name, setName, company, setCompany, engine, setEngine, price, setPrice, carClass, setCarClass } = useContext(SearchContext);
	
	// 검색옵션의 노출 여부를 조절하는 useState
	const [visible, setVisible] = useState({
		company: false,
		price: false,
		engine: false,
		carClass: false,
	});
	// map을 사용하기 위한 List화
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
	// 슬라이더에 표시를 남기는 방법, value는 값, label은 값에 표시될 글자
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
	// 검색칸에 글을 적을때 값이 변하도록 만드는 함수
	const onChangeSearch = e => {
		setName(e.target.value);
	}
	// 슬라이더를 바꿀 때 값이 변하도록 만드는 함수
	const onChangePrice = (event, newValue) => {
		setPrice({
			...price,
			min: newValue[0], // min 값 업데이트
			max: newValue[1], // max 값 업데이트
		});
	};
	// 버튼 클릭으로 노출여부를 결정하는 함수
	const onToggleButton = e => {
		console.log(visible)
		setVisible({...visible, [e.target.id]: !visible[e.target.id]});
	}
	// 검색시 가격요소를 적용시키는 함수
	const onClickPriceOn = () => {
		setPrice({...price, isPrice: true});
	}
	// 가격 요소를 지우고 상태도 초기화하는 함수
	const onClickPriceOff = () => {
		setPrice({min: 0, max: maxPrice ? maxPrice : 999999999, isPrice: false});
		setVisible({...visible, price: false});
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
				onClickPriceOn();}}>가격</ToggleButton>
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
					<CloseButton variant="outlined" onClick={(e) => {
						onToggleButton(e);
						onClickPriceOff();
					}}
					sx={{position: "absolute",
						right: 10,
						top: 10,}}> X </CloseButton>
				</SliderContainer>
			</OptionsBlock>
			{optionList.map((item,index) =>(
				<OptionsBlock key={index}>
					<ToggleButton id={item.id} variant="outlined" onClick={onToggleButton}>{item.name}</ToggleButton>
					<SearchOption value={item.value} setter={item.setter} list={item.list} visible={visible[item.id]} setVisible={setVisible} id={item.id} />
				</OptionsBlock>
			))}
		</OptionsContainer>
	)
}

export default SearchOptions