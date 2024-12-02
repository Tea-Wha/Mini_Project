import {useEffect, useState} from "react";
import SearchApi from "../../api/SearchPageApi"
import styled from "styled-components";

const BoardContainer = styled.div`
		width: 100%;
		display: flex;
`
const SearchContainer = styled.div`
		width: 30%;
		display: flex;
		flex-direction: column;
`

// {}에 감싸여 있는게 국형씨 요청사항
const SearchMain = () => {
	
	// 회사 목록을 불러와서 저장할 리스트
	const [companies, setCompanies] = useState([]);
	// 엔진 목록을 불러와서 저장할 리스트
	const [engines, setEngines] = useState([]);
	// 최대 금액을 불러와서 저장할 변수
	const [maxPrice, setMaxPrice] = useState(999999999);
	
	// 이름을 통해 검색을 할 때 사용할 Name
	// {값이 있으면 Car_Name 에 Like ? 를 사용하여 값 추출}
	const [name, setName] = useState("");
	// 회사 이름을 통해 검색하는 company
	// {버튼을 통해 조작할거라  in 사용}
	const [company, setCompany] = useState("");
	// 가격 범위를 통해 검색을 할 때 사용할 price
	// {isPrice 가 true 면 price 에 BETWEEN ? AND ? 를 사용하여 값 추출}
	const [price, setPrice] = useState({
		isPrice: false,
		min: 0,
		max: maxPrice,
	});
	// 엔진타입을 선택하기 위한 engine
	// {마찬가지로 버튼으로 고르는 것이므로 in 사용}
	const [engine, setEngine] = useState("");
	
	const [sort, setSort] = useState({
		sortBy: "name",
		sortType: "desc",
	})
	
	const onClickSearch = () => {}
	
	const value = { name, setName, company, setCompany, engine, setEngines, price, setPrice };
	
	useEffect(() => {
		const getCompany = async () => {
			try {
				const rsp = await SearchApi.companiesList();
				console.log(rsp.data);
				setCompanies(rsp.data);
			} catch (error) {
				alert("회사 정보에 서버가 응답하지 않습니다.");
			}
		}
		const getEngine = async () => {
			try {
				const rsp = await SearchApi.enginesList();
				console.log(rsp.data);
				setEngines(rsp.data);
			} catch (error) {
				alert("엔진 정보에 서버가 응답하지 않습니다.")
			}
		}
		const getMaxPrice = async () => {
			try {
				const rsp = await SearchApi.maxPrice();
				console.log(rsp.data);
				setMaxPrice(rsp.data);
			} catch (error) {
				alert("최대 가격에 서버가 응답하지 않습니다.")
			}
		}
		getCompany();
		getEngine();
		getMaxPrice();
	},[])
	
	
	return(
		<BoardContainer>
			<SearchContainer>
				<SearchOptions companies={companies} engines={engines} maxPrice={maxPrice}/>
			</SearchContainer>
			<ListConatiner>
				<SearchOptionCloser/>
				<SearchArrange/>
				<SearchItems/>
			</ListConatiner>
		</BoardContainer>
	)
}