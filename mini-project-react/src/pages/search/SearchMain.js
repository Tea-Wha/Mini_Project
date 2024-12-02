import {useEffect, useState} from "react";
import SearchApi from "../../api/SearchPageApi"


const SearchMain = () => {
	// 이름을 통해 검색을 할 때 사용할 Name
	// 값이 있으면 Car_Name 에 Like ? 를 사용하여 값 추출
	const [name, setName] = useState("");
	// 회사 이름을 통해 검색하는 company
	// 버튼을 통해 조작할거라  in 사용
	const [company, setCompany] = useState("");
	// 가격 범위를 통해 검색을 할 때 사용할 price
	// isPrice 가 true 면 price 에 BETWEEN ? AND ? 를 사용하여 값 추출
	const [price, setPrice] = useState({
		isPrice: false,
		minPrice: 0,
		maxPrice: 999999999999,
	});
	// 엔진타입을 선택하기 위한 engine
	// 마찬가지로 버튼으로 고르는 것이므로 in 사용
	const [engine, setEngine] = useState("");
	// 회사 목록을 불러와서 저장할 리스트
	const [companies, setCompanies] = useState([]);
	useEffect(() => {
		const company = async () => {
			try {
				const rsp = await SearchApi.companiesList();
				console.log(rsp.data);
				setCompanies(rsp.data);
			} catch (error) {
				alert("회사 정보에 서버가 응답하지 않습니다.");
			}
		}
		company();
	},[])
	
	
	
	
	
	
	
	return(
		<>
		
		</>
	)
}