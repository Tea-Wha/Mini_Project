import {createContext, useEffect, useState} from "react";


export const CarInfoContext = createContext(null);


const CarInfoStore= ({children}) => {
	
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
	
	const [carInfo, setCarInfo] = useState({});
	const [colors, setColors] = useState([]);
	const [options, setOptions] = useState([]);
	
	const [carPrice, setCarPrice] = useSyncedState("carPrice",[{name: "기본 금액", value:0, id:"carNo", price: 0},
		{name: "색상 금액", value:"", id:"color" , price: 0},{name: "옵션 금액", value:"", id:"options", price: 0}],);
	const [carColor, setCarColor] = useSyncedState("carColor","");
	const [carOptions, setCarOptions] = useSyncedState("carOptions",[]);
	const [isEditing, setIsEditing] = useSyncedState("isEditing",false);
	
	return (
		<CarInfoContext.Provider value={{carInfo, setCarInfo, colors, setColors, options, setOptions,
			carColor, setCarColor, carOptions, setCarOptions, isEditing, setIsEditing, carPrice, setCarPrice}}>
			{children}
		</CarInfoContext.Provider>
	)
	
	
};

export default CarInfoStore;