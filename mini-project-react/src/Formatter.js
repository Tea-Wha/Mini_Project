

export const priceFormatter = (price) => {
	if (price === undefined || price === null) {
		console.warn("priceFormatter에 undefined 또는 null 값 전달");
		return "0"; // 기본값 반환
	}
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}