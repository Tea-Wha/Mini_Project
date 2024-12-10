import {useContext, useEffect} from "react";
import CarInfoApi from "../../api/CarInfoApi";
import {CarInfoContext} from "../../context/CarInfoStore";
import {useParams} from "react-router-dom";
import styled from "styled-components";
import CustomizePreview from "./CustomizePreview";
import CustomizeOptions from "./CustomizeOptions";
import CustomizeResult from "./CustomizeResult";

const CustomizeContainer = styled.div`
		position: relative;
		display: flex;
		width: 100%;
		height: 100%;
		
`



const CustomizeMain = () => {
	
	const {carNo} = useParams();
	
	const{setCarInfo, setColors, setOptions, carColor, carOptions, setCarPrice, carPrice} = useContext(CarInfoContext);
	
	useEffect(() => {
		const carCustomInitialFetch = async () => {
			try {
				const [infoRsp, colorRsp, optionsRsp] = await Promise.all([
					CarInfoApi.getCarCustomize(carNo, carColor),
					CarInfoApi.getCarColor(carNo),
					CarInfoApi.getCarOptions(carNo),
				]);
				console.log(infoRsp.data);
				setCarInfo(infoRsp.data);
				console.log(colorRsp.data);
				setColors(colorRsp.data);
				console.log(optionsRsp.data);
				setOptions(optionsRsp.data);
				
			} catch (error) {
				alert("자동차 정보를 불러오는데 실패했습니다.")
				console.log(error)
			}
		}
		carCustomInitialFetch()
	},[carNo, carColor])
	
	useEffect(() => {
		const colorPriceUpdater = () => {
			setCarPrice(carPrice.map((item) =>
					item.id === "color" ? { ...item,  price: carColor.price} : item))
		}
		colorPriceUpdater()
	},[carColor])
	
	useEffect(() => {
		const optionPrice = () => Array.isArray(carOptions) ?
			carOptions.reduce((sum, item) => sum + (item.price || 0), 0)
			: 0
		const optionPriceUpdater = () => {
			setCarPrice(carPrice.map((item) =>
				item.id === "options" ? { ...item,  price: optionPrice()} : item))
		}
		optionPriceUpdater()
	},[carOptions])
	
	return (
		<CustomizeContainer>
			<CustomizePreview/>
			<CustomizeOptions/>
			<CustomizeResult/>
		</CustomizeContainer>
	)
}
export default CustomizeMain