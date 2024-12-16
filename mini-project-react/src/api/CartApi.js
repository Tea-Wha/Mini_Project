import axios from "axios";
const KH_DOMAIN = "http://localhost:8111";

const CartApi = {
	
	getCart: async (userId) => {
		console.log("카트 조회 : ", userId);
		return await axios.get(KH_DOMAIN + "/cart/getCart/" + userId);
	},
	
	postCart: async (cartVo) => {
		console.log("견적 저장 : " + JSON.stringify(cartVo));
		return await axios.post(KH_DOMAIN + "/cart/postCart", cartVo);
	},
	
	deleteCart: async (cartNo) => {
		console.log("카트 삭제 : " + cartNo);
		return await axios.post(KH_DOMAIN + "/cart/deleteCart/" + cartNo);
	},
	
	updateCart: async (cartVo) => {
		console.log("카트 업데이트 : " + JSON.stringify(cartVo));
		return await axios.post(KH_DOMAIN + "/cart/postCart", cartVo);
	},
	
	nameChange: async (cartName, cartNo) => {
		console.log("이름 변경 : " + cartName + "카트 번호 :" + cartNo);
		return await axios.post(KH_DOMAIN + "/cart/nameChange", {cartName, cartNo})
	}
	
}
export default CartApi