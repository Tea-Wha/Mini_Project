import axios from "axios";
import {KH_DOMAIN} from "./Constant";


const CarInfoApi = {
	
	// 자동차 정보를 돌리는 AxiosApi
	// car_No를 받아서 해당 자동차의 모든 정보를 얻는 역할
	//---------------------------- 국형씨 요청사항 -----------------------------
	// 받아올 정보 :
	// Car 테이블에 있는 모든 내용
	// 해당 자동차 제조사의 Manufacturer_NAME
	//
	// -------------------------------------------------------------------------
	getCarInfo: async (carNo) => {
		console.log("자동차 번호 : ", carNo);
		return await axios.get(KH_DOMAIN + "/detail/spec/"+ carNo);
	},
	// 헤딩 지동차의 색상
	// ------------------------- 국형씨 요청사항 ----------------------------
	// 가능하면 이미지 링크 + 회사이름의 객체의 배열로 받아올 수 있도록
	// 안된다면 이름의 배열로 받아오기
	//---------------------------------------------------------------------
	getCarColor: async (carNo) => {
		console.log("색상 조회 : " + carNo);
		return await axios.get(KH_DOMAIN + "/detail/color/"+ carNo);
	},
	// 해당 자동차의 옵션들
	getCarOptions: async (carNo) => {
		console.log("옵션 조회 : " + carNo);
		return await axios.get(KH_DOMAIN + "/detail/option/"+ carNo);
	},
	
	getCarCustomize: async (carNo) => {
		console.log("커스텀 가능한 요소 조회 : " + carNo);
		return await axios.get(KH_DOMAIN + "/customize/spec/"+ carNo);
	},
	getCarImage: async (carNo, color) => {
		const params = {
			carNo: carNo,
			color: color,
		}
	console.log("이미지 조회 : " + JSON.stringify(params))
		return await axios.get(KH_DOMAIN + "/customize/getImages", {params})
	},
}
export default CarInfoApi