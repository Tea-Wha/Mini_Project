import styled from 'styled-components'
import {useContext} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import CarInfoTable from "./CarInfoTable";

const CarDescContainer = styled.div``

const CarDescBlock = styled.div``

const CarImage = styled.img``

const CarDescription = styled.div``

const CarPriceContainer = styled.div``

const ManufacturerContainer = styled.div``

const ManufacturerButton = styled.button``

const ManufacturerLogo = styled.img``

const CustomizeContainer = styled.div``

const CustomizeButton = styled(Button)``

const CarDescText = styled.div``

const CarSummary = styled.div``


const CarInfoDesc = () => {
	
	const carInfo = useContext(CarInfoContext)
	
	
	
	
	return (
		<CarDescContainer>
			{carInfo &&
				<CarDescBlock>
					<CarImage src={carInfo.image} />
					<ManufacturerContainer>
						<Link to={`/brand/${carInfo.manufacturerCode}`}>
							<ManufacturerButton >
								<ManufacturerLogo src={carInfo.manufacturerName} />
							</ManufacturerButton>
						</Link>
					</ManufacturerContainer>
					<CustomizeContainer>
						<Link to={`/customize/${carInfo.carNo}`}>
							<CustomizeButton variant="outlined">
								견적 보기
							</CustomizeButton>
						</Link>
					</CustomizeContainer>
					<CarDescription>
						<CarPriceContainer>
							가격 : {carInfo.price}
						</CarPriceContainer>
						<CarDescText>
							설명 : {carInfo.carDesc}
						</CarDescText>
						<CarSummary>
							요약 : {carInfo.summary}
						</CarSummary>
						<CarInfoTable/>
					</CarDescription>
				</CarDescBlock>}
		</CarDescContainer>
	)
}
export default CarInfoDesc;
