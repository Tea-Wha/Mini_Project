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
	
	const [carPreview, setCarPreview] = useState({});
	
	
	const [carNo, setCarNo] = useSyncedState("carNo",-1);
	const [carPrice, setCarPrice] = useSyncedState("carPrice",{});
	const [carColor, setCarColor] = useSyncedState("carColor","");
	const [carOptions, setCarOptions] = useSyncedState("carOptions",[]);
	const [isEditing, setIsEditing] = useSyncedState("isEditing",false);
	
	return (
		<CarInfoContext.Provider value={{carInfo, setCarInfo, colors, setColors, options, setOptions, carNo, setCarNo, carColor, setCarColor, carOptions, setCarOptions, isEditing, setIsEditing, carPrice, setCarPrice}}>
			{children}
		</CarInfoContext.Provider>
	)
	
	
};

export default CarInfoStore;