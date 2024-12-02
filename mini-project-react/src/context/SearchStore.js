import {createContext, useState} from "react";


export const SearchContext = createContext(null);


const SearchStore= (props) => {
	const [name, setName] = useState(
		localStorage.getItem("searchName") || null
	);
	const [company, setCompany] = useState(
		localStorage.getItem("searchCompany") || null
	);
	const [engine, setEngines] = useState(
		localStorage.getItem("searchEngine") || null
	);
	const [price, setPrice] = useState(
		localStorage.getItem("searchPrice") || null
	);
	
	
	return <SearchContext.Provider value={{name, setName, company, setCompany, engine, setEngines, price, setPrice }}>
		{props.children}
	</SearchContext.Provider>;
};

export default SearchStore;