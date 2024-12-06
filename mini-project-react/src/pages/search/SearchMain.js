import {useContext, useEffect, useReducer, useState} from "react";
import SearchApi from "../../api/SearchPageApi"
import styled from "styled-components";
import SearchOptions from "./SearchOptions";
import {SearchContext} from "../../context/SearchStore";
import SearchArrange from "./SearchArrange";
import SearchItems from "./SearchItems";
import {Button} from "@mui/material";

//정렬용으로 만들어놓음 밑은 그냥 기능구분용
const BoardContainer = styled.div`
	display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
`

const SearchContainer = styled.div``

const ListContainer = styled.div``

const ClearButton = styled(Button)``

// 정렬 설정을 위한 reducer 정해진값으로만 변하게 하기 위해 reducer 사용
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
	// useContext를 이용해 전역 상태관리, 로컬에 담아서 세션이 만료되지 않는 한 유지됨
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
	// 화면이 시작하자마자 검색할 내용, 의존성배열로 버튼을 누르자마자 값이 변하게 설정
	useEffect(() => {
		search();
	}, [company, engine, carClass, sort]);
	
	// localStorage 를 초기화하는 함수
	const clearLocalStorage = () => {
		// 상태 초기화
		setName("");
		setCompany([]);
		setEngine([]);
		setCarClass([]);
		setPrice({ isPrice: false, min: 0, max: 999999999 });
	};
	
	// 검색 옵션 선택을 위해  DB에서 값들을 받아오는 코드, 4개를 각각 만들 필요 없이 한번에 돌아감
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