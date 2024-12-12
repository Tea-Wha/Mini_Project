import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const BrandApi = {
	
	getBrand: async (manufacturer) => {
		console.log("브랜드 조회 : ", manufacturer);
		return await axios.get(KH_DOMAIN + "/brand/getBrand",manufacturer);
	},

	getCar: async (manufacturer) => {
		console.log("브랜드 차량 조회 : " + manufacturer);
		return await axios.get(KH_DOMAIN + "/brand/getCar",manufacturer);
	},
	
}
export default BrandApi