import {createContext, useEffect, useState} from "react";


export const BrandContext = createContext(null);


const BrandStore= ({children}) => {
	
	
	
	const [brand, setBrand] = useState({
		name: "현대", url: "/testlogos/hyundai.png", code: 1, country: "한국"
	});
	const [brandCar, setBrandCar] = useState(
		[{carName:"test1", carFrontUrl:"/testimages/sonata_001.png", carNo:1},
			{carName:"test2", carFrontUrl:"/testimages/swp_63.png", carNo:3},]);
	const [cssStyle, setCssStyle] = useState("")
	
	
	return (
		<BrandContext.Provider value={{brand, setBrand, brandCar, setBrandCar, cssStyle, setCssStyle}}>
			{children}
		</BrandContext.Provider>
	)
	
	
};

export default BrandStore;