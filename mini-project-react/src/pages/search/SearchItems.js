import React, { useState } from "react";
import ClearIcon from '@mui/icons-material/Clear';
import {Box, TableRow, TableSortLabel} from "@mui/material";
import Paper from "@mui/material/Paper";
import { StyledLink } from "../../styles/home/HomeHead";
import {
	Image,
	ItemTableRow,
	ItemTableHead,
	ItemTableCell,
	ItemContainer,
	ItemTable, ItemTableBody
} from "../../styles/search/SearchItemStyle";

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
		{ name: "연료", id: "engine" },
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
								<StyledLink to={`/carInfo/${item.carNo}`} key={item.carNo}>
									<Image src={item.image} alt="Car" />
								</StyledLink>,
								item.carName,
								item.manufacturer,
								item.engineType,
								item.classification,
								item.price
							].map((value, index) => (
								<ItemTableCell key={index} align={index === 0 ? "left":"right" }>
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
