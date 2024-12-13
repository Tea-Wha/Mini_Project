import {useContext, useEffect} from "react";
import CarInfoApi from "../../api/CarInfoApi";
import {CarInfoContext} from "../../context/CarInfoStore";
import {useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import CustomizePreview from "./CustomizePreview";
import CustomizeOptions from "./CustomizeOptions";
import CustomizeResult from "./CustomizeResult";
import {UserContext} from "../../context/UserStore";
import CartApi from "../../api/CartApi";

const CustomizeContainer = styled.div`
		position: relative;
		display: flex;
		width: 100%;
		margin-bottom: 300px;
		padding-bottom: 300px;
`



const CustomizeMain = () => {
	const {update} = useParams();
	
	const updateFlag = update === "true";
	
	const {userId} = useContext(UserContext)
	
	const {carNo} = useParams();
	
	const{setCarInfo, setColors, setOptions, carColor, carOptions, setCarPrice, carInfo, carPrice, cartNo} = useContext(CarInfoContext);
	
	const navigate = useNavigate();
	
	useEffect(() => {
		const carCustomInitialFetch = async () => {
			try {
				const [infoRsp, colorRsp, optionsRsp] = await Promise.all([
					CarInfoApi.getCarInfo(carNo),
					CarInfoApi.getCarColor(carNo),
					CarInfoApi.getCarOptions(carNo),
				]);
				console.log(infoRsp.data);
				setCarInfo(infoRsp.data);
				console.log(colorRsp.data);
				setColors(colorRsp.data);
				console.log(optionsRsp.data);
				setOptions(optionsRsp.data);
				console.log(carPrice);
				
				setCarPrice(carPrice.map((item) =>
					item.id === "carNo" ? { ...item,  price: infoRsp.data.carPrice} : item));
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
	},[carOptions, carInfo])
	
	const onClickSubmit = async () => {
		const params = {
			userId: userId,
			carNo: carNo,
			carColor: carColor,
			carOptions: carOptions,
		}
		console.log(params);
		try {
			const rsp = await CartApi.postCart(params)
			console.log("결과 : " + rsp.data);
			if (rsp.data) {
				navigate("/cart");
			} else {
				alert("카트에 해당 견적을 추가하는데 실패했습니다.");
			}
		} catch (e) {
			alert("서버가 응답하지 않습니다.");
			console.log(e);
		}
	}
	
	const onClickUpdate = async () => {
		const params = {
			cartNo: cartNo,
			userId: userId,
			carNo: carNo,
			carColor: carColor,
			carOptions: carOptions,
		}
		console.log(params);
		try {
			const rsp = await CartApi.updateCart(params)
			console.log("결과 : " + rsp.data);
			if (rsp.data) {
				navigate("/cart");
			} else {
				alert("카트에 해당 견적을 추가하는데 실패했습니다.");
			}
		} catch (e) {
			alert("서버가 응답하지 않습니다.");
			console.log(e);
		}
	}
	
	return (
		<CustomizeContainer>
			<CustomizePreview carNo={carNo}/>
			<CustomizeOptions/>
			<CustomizeResult onClickSubmit={updateFlag? onClickUpdate : onClickSubmit} updateFlag={updateFlag}/>
		</CustomizeContainer>
	)
}
export default CustomizeMain