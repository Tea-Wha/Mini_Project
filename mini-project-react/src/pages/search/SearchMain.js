import {useContext, useEffect, useReducer, useState} from "react";
import SearchApi from "../../api/SearchPageApi"
import styled from "styled-components";
import SearchOptions from "./SearchOptions";
import {SearchContext} from "../../context/SearchStore";
import SearchArrange from "./SearchArrange";
import SearchItems from "./SearchItems";

const BoardContainer = styled.div``

const SearchContainer = styled.div``

const ListContainer = styled.div``

const sortReducer = (state, action) => {
	switch (action.type) {
		case "SET_SORT_BY":
			return { ...state, sortBy: action.payload };
		case "SET_SORT_TYPE":
			return { ...state, sortType: action.payload };
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
	const [list, setList] = useState([]);
	
	const {name,company,price,engine,carClass} = useContext(SearchContext);
	
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
	}, [company, engine, carClass, sort.sortBy, sort.sortType]);
	
	useEffect(() => {
		const fetchInitialData = async () => {
			try {
				const [companiesRsp, enginesRsp, maxPriceRsp, classesRsp] = await Promise.all([
					SearchApi.companiesList(),
					SearchApi.enginesList(),
					SearchApi.maxPrice(),
					SearchApi.carClassList(),
				]);
				
				setCompanies(companiesRsp.data);
				setEngines(enginesRsp.data);
				setMaxPrice(maxPriceRsp.data);
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
					setSortBy={(sortBy) => dispatchSort({ type: "SET_SORT_BY", payload: sortBy })}
					setSortType={(sortType) => dispatchSort({ type: "SET_SORT_TYPE", payload: sortType })}
				/>
				<SearchItems list={list}/>
			</ListContainer>
		</BoardContainer>
	)
}
export default SearchMain;