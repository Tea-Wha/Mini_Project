import axios from "axios";
import {KH_DOMAIN} from "./Constant";


const BrandApi = {
	
	getBrand: async (manufacturer) => {
		console.log("브랜드 조회 : ", manufacturer);
		return await axios.get(KH_DOMAIN + "/brand/getBrand/" + manufacturer);
	},

	getCar: async (manufacturer) => {
		console.log("브랜드 차량 조회 : " + manufacturer);
		return await axios.get(KH_DOMAIN + "/brand/getCar/" + manufacturer);
	},
	
	getBrandList: async () => {
		console.log("브랜드 전체 조회")
		return await axios.get(KH_DOMAIN + "/brand/all");
	}
}
export default BrandApi