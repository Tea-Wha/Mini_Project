import {createContext, useEffect, useState} from "react";
import {useSyncedState} from "./ModdedState";


export const CarInfoContext = createContext(null);


const CarInfoStore= ({children}) => {
	
	const [carInfo, setCarInfo] = useState({});
	const [colors, setColors] = useState([]);
	const [options, setOptions] = useState([]);
	
	const [carPrice, setCarPrice] = useSyncedState("carPrice",[{name: "기본 금액", id:"carNo", price: 0},
		{name: "색상 금액", id:"color" , price: 0},{name: "옵션 금액" , id:"options", price: 0}],);
	const [carColor, setCarColor] = useSyncedState("carColor","");
	const [carOptions, setCarOptions] = useSyncedState("carOptions",[]);
	
	
	const [cartNo, setCartNo] = useSyncedState("cartNo",0);
	
	useEffect(() => {
		console.log("carInfo : " + JSON.stringify(carInfo));
	},[carInfo]);
	
	useEffect(() => {
		console.log("carColor : " + carColor);
	},[carColor]);;
	
	return (
		<CarInfoContext.Provider value={{carInfo, setCarInfo, colors, setColors, options, setOptions,
			carColor, setCarColor, carOptions, setCarOptions, carPrice, setCarPrice, cartNo, setCartNo}}>
			{children}
		</CarInfoContext.Provider>
	)
	
	
};

export default CarInfoStore;