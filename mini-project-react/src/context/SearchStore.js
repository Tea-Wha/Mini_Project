import {createContext, useEffect, useState} from "react";


export const SearchContext = createContext(null);


const SearchStore= (props) => {
	const useSyncedState = (key, defaultValue) => {
		const [state, setState] = useState(() => {
			const savedValue = localStorage.getItem(key);
			return savedValue ? JSON.parse(savedValue) : defaultValue;
		});
		
		useEffect(() => {
			localStorage.setItem(key, JSON.stringify(state));
		}, [state, key]);
		
		return [state, setState];
	};
	
	// 이름을 통해 검색하는 name
	// {Like 검색사용 값을 넘길때부터 %를 앞뒤에 붙여서 보낼 것임}
	const [name, setName] = useSyncedState("searchName", "")
	// 회사 이름을 통해 검색하는 company
	// {버튼을 통해 조작할거라  in 사용}
	const [company, setCompany] = useSyncedState("searchCompany", []);
	// 엔진타입을 선택하기 위한 engine
	// {마찬가지로 버튼으로 고르는 것이므로 in 사용}
	const [engine, setEngine] = useSyncedState("searchEngine", []);
	// 차종을 통해 검색하는 carClass
	// { company 와 동일}
	const [carClass, setCarClass] = useSyncedState("searchCarClass", [])
	// 가격 범위를 통해 검색을 할 때 사용할 price
	// {isPrice 가 true 면 price 에 BETWEEN ? AND ? 를 사용하여 값 추출}
	const [price, setPrice] = useSyncedState("searchPrice", {isPrice: false, min: 0, max: 999999999,});
	
	return (
	<SearchContext.Provider value={{company, setCompany, engine, setEngine, price, setPrice, carClass, setCarClass, name, setName}}>
		{props.children}
	</SearchContext.Provider>
	)
	

};

export default SearchStore;