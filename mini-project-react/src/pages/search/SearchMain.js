import {useContext, useEffect, useReducer, useState} from "react";
import SearchApi from "../../api/SearchPageApi"
import styled from "styled-components";
import SearchOptions from "./SearchOptions";
import {SearchContext} from "../../context/SearchStore";
import SearchArrange from "./SearchArrange";
import SearchItems from "./SearchItems";
import {Button} from "@mui/material";

const BoardContainer = styled.div`
	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
`

const SearchContainer = styled.div``

const ListContainer = styled.div``

const ClearButton = styled(Button)``

const sortReducer = (state, action) => {
	switch (action.type) {
		case "SET_SORT_BY":
			// 정렬 기준 변경 시 정렬 방향을 초기화
			if (state.sortBy === action.payload) {
				// 기준이 동일하면 정렬 방향 토글
				return {
					...state,
					sortType: state.sortType === "asc" ? "desc" : "asc",
				};
			} else {
				// 기준이 바뀌면 정렬 방향 초기화
				return {
					...state,
					sortBy: action.payload,
					sortType: "asc", // 새 기준으로 변경 시 초기값
				};
			}
		default:
			return state;
	}
};

// {}에 감싸여 있는게 국형씨 요청사항
const SearchMain = () => {
	
	// 회사 목록을 불러와서 저장할 리스트
	const [companies, setCompanies] = useState([]);
	// 엔진 목록을 불러와서 저장할 리스트
	const [engines, setEngines] = useState([]);
	// 차종을 불러와서 저장할 리스트
	const [classList,setClassList] = useState([]);
	// 최대 금액을 불러와서 저장할 변수
	const [maxPrice, setMaxPrice] = useState(999999999);
	
	// 정렬을 위한 sort
	// {정렬은 DB 에서 말고, Back 에서 Comparator (Switch Case 사용) 나 Comparable 사용
	const [sort, dispatchSort] = useReducer(sortReducer, {
		sortBy: "price",
		sortType: "asc",
	});
	// 받아온 정보를 배열로 받을 list
	const [list, setList] = useState(null);
	
	const {name,company,price,engine,carClass, setName, setCompany, setPrice, setEngine, setCarClass} = useContext(SearchContext);
	
	// 검색을 위한 search
	const search = async () => {
		try {
			const rsp = await SearchApi.carListSearch(name,company,price,engine,carClass,sort);
			console.log(rsp.data);
			setList(rsp.data)
		} catch (error) {
			alert("검색에 서버가 응답하지 않습니다.")
		}
	}
		
	useEffect(() => {
		search();
	}, [company, engine, carClass, sort]);
	
	const clearLocalStorage = () => {
		localStorage.removeItem("searchName");
		localStorage.removeItem("searchCompany");
		localStorage.removeItem("searchEngine");
		localStorage.removeItem("searchCarClass");
		localStorage.removeItem("searchPrice");
		
		// 상태도 초기화
		setName("");
		setCompany([]);
		setEngine([]);
		setCarClass([]);
		setPrice({ isPrice: false, min: 0, max: 999999999 });
	};
	
	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const [companiesRsp, enginesRsp, maxPriceRsp, classesRsp] = await Promise.all([
					SearchApi.companiesList(),
					SearchApi.enginesList(),
					SearchApi.maxPrice(),
					SearchApi.carClassList(),
				]);
				console.log(companiesRsp.data);
				setCompanies(companiesRsp.data);
				console.log(enginesRsp.data);
				setEngines(enginesRsp.data);
				console.log(maxPriceRsp.data);
				setMaxPrice(maxPriceRsp.data);
				console.log(classesRsp.data);
				setClassList(classesRsp.data);
			} catch (error) {
				alert("초기 데이터를 불러오는 중 문제가 발생했습니다.");
			}
		};
		fetchInitialData();
	}, []);
	
	return(
		<BoardContainer>
			<SearchContainer>
				<SearchOptions companies={companies} engines={engines} maxPrice={maxPrice} classList={classList} search={search} />
			</SearchContainer>
			<ListContainer>
				<SearchArrange
					sort={sort}
					setSortBy={(sortBy) =>
						dispatchSort({ type: "SET_SORT_BY", payload: sortBy })
					}
				/>
				<ClearButton onClick={clearLocalStorage}> X </ClearButton>
				<SearchItems list={list}/>
			</ListContainer>
		</BoardContainer>
	)
}
export default SearchMain;