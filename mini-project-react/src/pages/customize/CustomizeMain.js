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
import NavComponent from "../../components/NavComponent";

const CustomizeContainer = styled.div`
		position: relative;
		display: flex;
		width: 100%;
		margin-bottom: 300px;
		padding-bottom: 300px;
`



const CustomizeMain = () => {
	const {update} = useParams();
	console.log(update);
	const updateFlag = update === "true";
	console.log(updateFlag);
	
	const {userId} = useContext(UserContext)
	
	const {carNo} = useParams();
	
	const{setCarInfo, setColors, setOptions, carColor, carOptions, setCarPrice, colors, carPrice, cartNo} = useContext(CarInfoContext);
	
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
		return () => {
			setCarInfo([])
			setColors([])
			setOptions([])
			setCarPrice([{name: "기본 금액", id:"carNo", price: 0},
				{name: "색상 금액", id:"color" , price: 0},{name: "옵션 금액" , id:"options", price: 0}])
		}
	},[])
	
	useEffect(() => {
		const colorPriceUpdater = () => {
			const colorPrice = () => {
				console.log("carColor : " + carColor)
				const selectedColor = colors.find((item) => item.colorName === carColor[0]);
				console.log("선택된 색상 : " + JSON.stringify(selectedColor));
				return selectedColor ? selectedColor.colorPrice : null; // 조건에 맞는 값이 없으면 null 반환
			};
			setCarPrice(carPrice.map((item) =>
					item.id === "color" ? { ...item,  price: colorPrice()} : item))
		}
		colorPriceUpdater()
	},[carColor])
	
	useEffect(() => {
		const optionPrice = () => Array.isArray(carOptions) ?
			carOptions.reduce((sum, item) => sum + (item.featurePrice || 0), 0)
			: 0
		const optionPriceUpdater = () => {
			setCarPrice(carPrice.map((item) =>
				item.id === "options" ? { ...item,  price: optionPrice()} : item))
		}
		optionPriceUpdater()
	},[carOptions])
	
	const onClickSubmit = async () => {
		const params = {
			userId: userId,
			carNo: carNo,
			cartColor: carColor ? carColor[0] : colors[0].carColor,
			cartOption: JSON.stringify(carOptions),
			cartPrice: carPrice[0].price + carPrice[1].price + carPrice[2].price,
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
			cartColor: carColor ? carColor[0] : colors[0].carColor,
			cartOption: JSON.stringify(carOptions),
			cartPrice: carPrice[0].price + carPrice[1].price + carPrice[2].price,
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
		<>
			<NavComponent/>
			<CustomizeContainer>
				<CustomizePreview carNo={carNo}/>
				<CustomizeOptions/>
				<CustomizeResult onClickSubmit={updateFlag ? onClickUpdate : onClickSubmit} updateFlag={updateFlag}/>
			</CustomizeContainer>
		</>
	)
}
export default CustomizeMain