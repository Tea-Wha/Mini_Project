import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {Box, IconButton, TableRow, TableSortLabel} from "@mui/material";
import Paper from "@mui/material/Paper";
import { StyledLink } from "../../styles/home/HomeHead";
import {
	Image,
	ItemTableRow,
	ItemTableHead,
	ItemTableCell,
	ItemContainer,
	ItemTable, ItemTableBody, Logo
} from "../../styles/search/SearchItemStyle";
import {priceFormatter} from "../../Formatter";

// 비교를 위한 Comparator
const descendingComparator = (a, b, orderBy) => {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
};

// 정렬방향과 정렬기준을 통해 정렬시켜주는 함수
const getComparator = (order, orderBy) => {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
};

// 모든 요소를 정렬시키는 함수
const stableSort = (array, comparator) => {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = comparator(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map((el) => el[0]);
};

const SearchItems = ({ list }) => {
	const [order, setOrder] = useState("asc");
	const [orderBy, setOrderBy] = useState("carName");
	
	
	
	// 클릭하면 정렬시켜주는 함수
	const handleRequestSort = (event, property) => {
		const isAscending = orderBy === property && order === "asc";
		setOrder(isAscending ? "desc" : "asc");
		setOrderBy(property);
	};
	
	const sortList = [
		{ name: "이름", id: "carName" },
		{ name: "제조사", id: "manufacturer" },
		{ name: "연료", id: "engineType" },
		{ name: "차종", id: "classification" },
		{ name: "가격", id: "price" },
	];
	
	if (!list || list.length === 0) {
		return <div>데이터가 없습니다.</div>; // list가 없거나 비어있으면 메시지 출력
	}
	
	return (
		<ItemContainer component={Paper}>
			<ItemTable sx={{ minWidth: 650 }} size="small" aria-label="search items table">
				<ItemTableHead>
					<ItemTableRow>
						<ItemTableCell align="left">이미지</ItemTableCell>
						{sortList.map((header, index) => (
							<ItemTableCell key={index} align= "right">
								<TableSortLabel
									active={orderBy === header.id}
									direction={orderBy === header.id ? order : "asc"}
									onClick={(event) => handleRequestSort(event, header.id)}>
									{header.name}
									{orderBy === header.id ? (
										<Box component="span" sx={{ visuallyHidden: true }}></Box>
									) : null}
								</TableSortLabel>
							</ItemTableCell>
						))}
					</ItemTableRow>
				</ItemTableHead>
				<ItemTableBody>
					{stableSort(list, getComparator(order, orderBy)).map((item) => (
						<TableRow key={item.carNo}>
							{[
								// 차량 이미지 클릭 시 차량 정보 페이지로 이동
								<StyledLink to={`/carInfo/${item.carNo}`} key={item.carNo}>
									<Image src={item.carFrontUrl || `/testimages/sonata_001.png`} alt="Car" />
								</StyledLink>,
								
								
								// 나머지 항목들도 차량 정보 페이지로 이동하게 링크 추가
								<StyledLink to={`/carInfo/${item.carNo}`} key={item.carName}>
									{item.carName}
								</StyledLink>,
								
								// 브랜드 이름 클릭 시 브랜드 페이지로 이동
								<StyledLink to={`/brand/${item.manufacturerName}`} key={item.carName}>
									<IconButton sx = {{height:"70px", width:"70px"}}>
										<Logo src={item.manufacturerUrl || `/testlogos/hyundai.png`} alt="logo" />
									</IconButton>
								</StyledLink>,
								
								<StyledLink to={`/carInfo/${item.carNo}`} key={item.engineType}>
									{item.engineType}
								</StyledLink>,
								
								<StyledLink to={`/carInfo/${item.carNo}`} key={item.classification}>
									{item.classification}
								</StyledLink>,
								
								<StyledLink to={`/carInfo/${item.carNo}`} key={item.price}>
									{priceFormatter(item.price)}
								</StyledLink>,
							].map((value, index) => (
								<ItemTableCell key={index} align={index === 0 ? "left" : "right"}>
									{value}
								</ItemTableCell>
							))}
						</TableRow>
					))}
				</ItemTableBody>
			
			</ItemTable>
		</ItemContainer>
	);
};

export default SearchItems;
