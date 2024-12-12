import {createContext, useEffect, useState} from "react";
import {useSyncedState} from "./ModdedState";


export const CarInfoContext = createContext(null);


const CarInfoStore= ({children}) => {
	
	const [carInfo, setCarInfo] = useState({});
	const [colors, setColors] = useState(
		[{commonName:"blue",commonUrl:"/testColor/C6K.avif"},
			{commonName:"green",commonUrl:"/testColor/OWG.avif"},
			{commonName:"red",commonUrl:"/testColor/C74.avif"},
			{commonName:"yellow",commonUrl:"/testColor/SSY.avif"},]);
	const [options, setOptions] = useState([
		{name: "테스트용 옵션", desc: "테스트용 옵션의 설명입니다 설명이다보니 더 길게 적어보고 있습니다 \n 개행문자도 확인해보겠습니다"},
		{name: "두번째 테스트 입니다", desc: "테스트용 옵션의 \n 두번째입니다\n 이번엔\n여러줄을\n시험\n해보려고\n이렇게\n했습니다.\n"}
	]);
	
	const [carPrice, setCarPrice] = useSyncedState("carPrice",[{name: "기본 금액", value:0, id:"carNo", price: 0},
		{name: "색상 금액", value:"0", id:"color" , price: 0},{name: "옵션 금액", value:"", id:"options", price: 0}],);
	const [carColor, setCarColor] = useSyncedState("carColor","");
	const [carOptions, setCarOptions] = useSyncedState("carOptions",[]);
	
	
	const [cartNo, setCartNo] = useSyncedState("cartNo",0);
	
	useEffect(() => {
		console.log("carInfo : " + carInfo);
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