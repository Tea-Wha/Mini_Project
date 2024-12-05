import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const CarInfoApi = {
	
	// 자동차 정보를 돌리는 AxiosApi
	// car_No를 받아서 해당 자동차의 모든 정보를 얻는 역할
	//---------------------------- 국형씨 요청사항 -----------------------------
	// 받아올 정보 :
	// Car 테이블에 있는 모든 내용
	// -------------------------------------------------------------------------
	getCarInfo: async (car_No) => {
		console.log("자동차 번호 : ", car_No);
		return await axios.get(KH_DOMAIN + "/carInfo/getInfo",car_No);
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
export default CarInfoApi