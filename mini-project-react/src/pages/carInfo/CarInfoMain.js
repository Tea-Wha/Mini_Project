import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import CarInfoApi from "../../api/CarInfoApi";
import {CarInfoContext} from "../../context/CarInfoStore";
import CarInfoDesc from "./CarInfoDesc";
import NavComponent from "../../components/NavComponent";

const CarInfoContainer = styled.div``

const BackGround = styled.div`
	position: fixed;
		background-color: #f5f5f5;
		width: 100%;
		height: 100vh;
		top:0;
`

const CarInfoMain = () => {
	const {carNo} = useParams();
	
	const{setCarInfo, setColors, setOptions} = useContext(CarInfoContext);
	
	
	
	useEffect(() => {
		const carInfoInitialFetch = async () => {
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
			} catch (error) {
				alert("자동차 정보를 불러오는데 실패했습니다.")
				console.log(error)
			}
		}
		carInfoInitialFetch()
		return () => {
			setCarInfo([])
			setColors([])
			setOptions([])
		}
	},[carNo])
	
	return(
		<CarInfoContainer>
			<BackGround/>
			<NavComponent color={true}/>
			<CarInfoDesc/>
		</CarInfoContainer>
	)
}

export default CarInfoMain;