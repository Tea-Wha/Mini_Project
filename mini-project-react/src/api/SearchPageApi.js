import axios from "axios";
import {KH_DOMAIN} from "./Constant";


const SearchApi = {
	
	// 전체 검색을 돌리는 AxiosApi
	//---------------------------- 국형씨 요청사항 -----------------------------
	// pages/search/SearchMain 주석 확인
	// 기본적으로 쿼리문을 전체 검색을 하는 쿼리문을 작성한 뒤
	// 작성된 쿼리문에 문자열 연산자를 사용하여 WHERE 조건문을 넣는 스타일
	// 만약 해당하는 값이 없으면 (null) 전체 검색이 되도록 추가 쿼리문을 붙이지 않도록 코드 작성
	// * sort 는 정렬을 위한 옵션으로 추가 DB에 쓰진 않고 자바에서 Comparator 사용할 때 쓰기
	// ex) carListSearch 를 name 과 price 와 engine 에 대해서 한다면
	// 쿼리문은 SELECT CAR_NAME, PRICE, MANUFACTURER_NAME(VIEW 사용으로 조인 시켜놓기), ENGINE_TYPE FROM CARS(VIEW)
	// + WHERE(만약 하나라도 null이 아니면 들어가게 만들기) + Name Like ?
	// + AND(다른 값이 있다면 앞에 들어가게 만들기) + PRICE BETWEEN ? AND ?
	// price 의 경우 최대 최소를 받아서 사용
	// + AND ENGINE_TYPE in engine 엔진은 안에 있는지로 검색
	// -------------------------------------------------------------------------
	carListSearch: async (name, company, price, engine, carClass) => {
		
		const listVo = {
			carName: name,
			manufacturer: company.join(","),
			isPrice: price.isPrice,
			maxPrice: price.isPrice ? price.max : null,
			minPrice: price.isPrice ? price.min : null,
			engineType: engine.join(","),
			classification: carClass.join(","),
		};
		console.log("조건에따라 검색하기\n" +
			"검색 내용 : " + JSON.stringify(listVo));
		return await axios.post(KH_DOMAIN + "/carList/search", (listVo));
	},
	// ------------------------- 국형씨 요청사항 ----------------------------
	// 가능하면 이미지 링크 + 회사이름의 객체의 배열로 받아올 수 있도록
	// 안된다면 이름의 배열로 받아오기
	//---------------------------------------------------------------------
	companiesList: async () => {
		console.log("회사 목록 불러오기")
		return await axios.get(KH_DOMAIN + "/carList/companies");
	},
	enginesList: async () => {
		console.log("엔진 목록 불러오기")
		return await axios.get(KH_DOMAIN + "/carList/engines");
	},
	maxPrice: async () => {
		console.log("최대 가격 불러오기")
		return await axios.get(KH_DOMAIN + "/carList/maxPrice");
	},
	carClassList: async () => {
		console.log("자동차 종류 불러오기")
		return await axios.get(KH_DOMAIN + "/carList/carClasses");
	}
}
export default SearchApi