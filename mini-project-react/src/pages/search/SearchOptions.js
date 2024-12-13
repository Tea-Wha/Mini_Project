import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../../context/SearchStore";
import {
	Slider,
	Button,
	Tooltip,
} from "@mui/material";
import { ExpandMore, Clear as ClearIcon } from "@mui/icons-material";
import SearchBar from "../../components/SearchBar";
import AccordionComponent from "../../components/AccordionComponent";
import OptionComponent from "../../components/OptionComponent";



const OptionsContainer = styled.div``;

const OptionsBlock = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    margin: 10px auto;
`;

const InputContainer = styled.div`
    display: flex;
    padding: 15px 30px;
    justify-content: center;
    align-items: center;
    width: 80%;
		margin: 0 auto;
`;

const SliderWidth = styled.div`
    display: flex;
    border-radius: 8px;
    margin: 10px;
		gap: 20px;
    justify-content: space-evenly;
    align-items: start;
`;


const CloseButton = styled(Button)``


const PriceSlider = styled(Slider)``;

const SearchOptions = ({ companies, engines, maxPrice, classList, search }) => {
	const {
		name,
		setName,
		company,
		setCompany,
		engine,
		setEngine,
		price,
		setPrice,
		carClass,
		setCarClass,
	} = useContext(SearchContext);
	
	const [visible, setVisible] = useState({ price: false, company: false, engine: false, carClass: false });
	
	const optionList = [
		{
			name: "제조사",
			id: "company",
			value: company,
			setter: setCompany,
			list: companies,
		},
		{
			name: "엔진",
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
	];
	
	const marks = [
		{ value: 0, label: "0원" },
		{ value: 60000000, label: "6천만원" },
		{ value: 300000000, label: "3억원" },
		{ value: 600000000, label: "6억원" },
	];
	
	const onChangeSearch = (e) => {
		setName(e.target.value);
	};
	
	const onChangePrice = (event, newValue) => {
		setPrice({
			...price,
			isPrice: true,
			min: newValue[0],
			max: newValue[1],
		});
	};
	
	const onClickPriceOff = () => {
		setPrice({ min: 0, max: maxPrice || 999999999, isPrice: false });
		setVisible({ ...visible, price: false });
	};
	
	return (
		<OptionsContainer>
			<OptionsBlock>
				<InputContainer>
					<SearchBar value={name}
					           onChange={onChangeSearch}
					           onSearch={search}
					           placeholder="검색하실 차 이름을 입력해주세요"
					/>
				</InputContainer>
			</OptionsBlock>
			<OptionsBlock>
				<AccordionComponent label={`조회하실 가격범위를 설정하세요`} name="가격 범위" id="price" visible={visible} setVisible={setVisible}>
					<SliderWidth>
						<PriceSlider
							value={[price.min, price.max]}
							onChange={onChangePrice}
							valueLabelDisplay="auto"
							min={0}
							max={maxPrice || 999999999}
							step={5000000}
							marks={marks}
						/>
						<Tooltip title="선택 내용 초기화">
							<CloseButton
								variant="outlined"
								onClick={(e) => onClickPriceOff()}
							>
								<ClearIcon />
							</CloseButton>
						</Tooltip>
					</SliderWidth>
				</AccordionComponent>
			</OptionsBlock>
			{optionList.map((item, index) => (
				<OptionsBlock key={index}>
					<AccordionComponent label={`조회하실 ${item.name}들을 설정하세요`} name={item.name} id={item.id} visible={visible} setVisible={setVisible}>
						<OptionComponent
							value={item.value}
							setter={item.setter}
							list={item.list}
							id={item.id}
							visible={visible}
							setVisible={setVisible}
							keyName="commonName"
							keyUrl="commonUrl"
						/>
					</AccordionComponent>
				</OptionsBlock>
			))}
		</OptionsContainer>
	);
};

export default SearchOptions;
