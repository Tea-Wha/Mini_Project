import {createContext, useEffect, useState} from "react";


export const CarInfoContext = createContext(null);


const CarInfoStore= (props) => {
	
	const [carInfo, setCarInfo] = useState({});
	const [colors, setColors] = useState([]);
	const [options, setOptions] = useState([]);
	
	return (
		<CarInfoContext.Provider value={{carInfo, setCarInfo, colors, setColors, options, setOptions}}>
			{props.children}
		</CarInfoContext.Provider>
	)
	
	
};

export default CarInfoStore;