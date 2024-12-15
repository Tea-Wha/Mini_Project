import styled from "styled-components";
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";

import BrandDesc from "./BrandDesc";
import {BrandContext} from "../../context/BrandStore";
import BrandApi from "../../api/BrandApi";
import NavComponent from "../../components/NavComponent";

const BrandContainer = styled.div``


const BrandMain = () => {
	const {brand} = useParams();
	
	const{setBrand, setBrandCar} = useContext(BrandContext);
	
	
	
	useEffect(() => {
		const brandInfoInitialFetch = async () => {
			try {
				const [brandRsp, carRsp] = await Promise.all([
					BrandApi.getBrand(brand),     //
					BrandApi.getCar(brand),    //
					
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
		return () => {
			setBrandCar([])
			setBrand({})
		}
	},[brand])
	
	return(
		<BrandContainer>
			<NavComponent/>
			<BrandDesc/>
		</BrandContainer>
	)
}

export default BrandMain;