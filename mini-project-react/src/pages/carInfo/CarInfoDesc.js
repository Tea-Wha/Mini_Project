import styled from 'styled-components'
import {useContext, useState} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import {Link} from "react-router-dom";
import {Button, Card} from "@mui/material";
import CarInfoTable from "./CarInfoTable";
import AccordianComponent from "../../components/AccordionComponent";

const CarDescContainer = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 1000px;
		margin: 10px auto;
`

const CarDescCard = styled(Card)`
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		margin: 10px auto;
`

const CarImage = styled.img``

const CarDescription = styled(Card)`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		
`

const CarCardInfoContainer = styled.div``

const ManufacturerContainer = styled.div``

const ManufacturerButton = styled.button``

const ManufacturerLogo = styled.img``

const CustomizeContainer = styled.div``

const CustomizeButton = styled(Button)``

const CarDescText = styled.div``

const CarSummary = styled.div``

const AccordionContainer = styled.div`
		width: 80%;
		margin: 0 auto;
`


const CarInfoDesc = () => {
	
	const carInfo = useContext(CarInfoContext)
	
	const [visible, setVisible] = useState({table:false})
	
	
	return (
		<CarDescContainer>
			{carInfo &&
				<CarDescCard>
					<CarImage src={carInfo.image}/>
					<ManufacturerContainer>
						<Link to={`/brand/${carInfo.manufacturerCode}`}>
							<ManufacturerButton >
								<ManufacturerLogo src={carInfo.manufacturerName} />
							</ManufacturerButton>
						</Link>
					</ManufacturerContainer>
					<CarDescription>
						<CarCardInfoContainer>
							차종 : {carInfo.classification}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							엔진 : {carInfo.price}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							가격 : {carInfo.price}
						</CarCardInfoContainer>
						<CustomizeContainer>
							<Link to={`/customize/${carInfo.carNo}`}>
								<CustomizeButton variant="outlined">
									견적 보기
								</CustomizeButton>
							</Link>
						</CustomizeContainer>
					</CarDescription>
				</CarDescCard>}
			<CarDescription>
				<CarDescText>
					설명 : {carInfo.carDesc}
				</CarDescText>
			</CarDescription>
			<CarDescription>
				<CarSummary>
					요약 : {carInfo.summary}
				</CarSummary>
			</CarDescription>
			<AccordionContainer>
				<AccordianComponent label={`실제 차량과 다를수 있습니다.`} id="table" name="재원 정보" visible={visible} setVisible={setVisible}>
					<CarInfoTable/>
				</AccordianComponent>
			</AccordionContainer>
		</CarDescContainer>
	)
}
export default CarInfoDesc;
