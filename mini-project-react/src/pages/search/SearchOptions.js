import React, { useContext, useState } from "react";
import styled from "styled-components";
import { SearchContext } from "../../context/SearchStore";
import SearchOption from "./SearchOption";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Slider,
	TextField,
	Button,
	Tooltip,
	Typography,
	Chip
} from "@mui/material";
import { ExpandMore, Clear as ClearIcon } from "@mui/icons-material";
import Divider from '@mui/material/Divider';
import SearchBar from "../../components/SearchBar";



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
    width: 80%;
    margin: 10px;
    position: relative;
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
	];
	
	const marks = [
		{ value: 0, label: "0원" },
		{ value: 30000000, label: "3천만원" },
		{ value: 60000000, label: "6천만원" },
		{ value: 100000000, label: "1억원" },
		{ value: 150000000, label: "1억5천만원" },
		{ value: 200000000, label: "2억원" },
	];
	
	const onChangeSearch = (e) => {
		setName(e.target.value);
	};
	
	const onChangePrice = (event, newValue) => {
		setPrice({
			...price,
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
				<Accordion expanded={visible.price} onChange={() => setVisible((prev) => ({ ...prev, price: !prev.price }))}>
					<AccordionSummary
						expandIcon={<ExpandMore />}
						aria-controls="price-content"
						id="price-header"
					>
						<Typography>가격</Typography>
					</AccordionSummary>
					<Divider>
						<Chip label="원하는 가격 범위를 설정하세요" size="small" />
					</Divider>
					<AccordionDetails sx={{display: "flex", justifyContent: "space-evenly", alignItems: "start"}}>
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
						</SliderWidth>
						<Tooltip title="선택 내용 초기화">
							<CloseButton
								variant="outlined"
								onClick={(e) => onClickPriceOff()}
							>
								<ClearIcon />
							</CloseButton>
						</Tooltip>
					</AccordionDetails>
				</Accordion>
			</OptionsBlock>
			{optionList.map((item, index) => (
				<OptionsBlock key={index}>
					<Accordion expanded={visible[item.id]} onChange={() => setVisible({ ...visible, [item.id]: !visible[item.id] })}>
						<AccordionSummary
							expandIcon={<ExpandMore />}
							aria-controls={`${item.id}-content`}
							id={`${item.id}-header`}
						>
							<Typography>{item.name}</Typography>
							
						</AccordionSummary>
						<Divider>
							<Chip label={`원하는 ${item.name}들을 설정하세요`} size="small" />
						</Divider>
						<AccordionDetails>
							<SearchOption
								value={item.value}
								setter={item.setter}
								list={item.list}
								id={item.id}
								visible={visible}
								setVisible={setVisible}
							/>
						</AccordionDetails>
					</Accordion>
				</OptionsBlock>
			))}
		</OptionsContainer>
	);
};

export default SearchOptions;
