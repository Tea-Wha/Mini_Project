import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import CarInfoApi from "../../api/CarInfoApi";
import BrandDesc from "./BrandDesc";
import {BrandContext} from "../../context/BrandStore";

const BrandContainer = styled.div``


const BrandMain = () => {
	const {brandCode} = useParams();
	
	const{setBrand, setBrandCar, setCssStyle} = useContext(BrandContext);
	
	
	
	useEffect(() => {
		const brandInfoInitialFetch = async () => {
			try {
				const [brandRsp, carRsp] = await Promise.all([
					CarInfoApi.getCarInfo(brandCode),     //
					CarInfoApi.getCarColor(brandCode),    //
					CarInfoApi.getCarOptions(brandCode),  //
				]);
				console.log(brandRsp.data);
				setBrand(brandRsp.data);
				console.log(carRsp.data);
				setBrandCar(carRsp.data);
			} catch (error) {
				alert("브랜드 정보를 불러오는데 실패했습니다.")
				console.log(error)
			}
		}
		brandInfoInitialFetch()
	},[brandCode])
	
	return(
		<BrandContainer>
			<BrandDesc/>
		</BrandContainer>
	)
}

export default BrandMain;