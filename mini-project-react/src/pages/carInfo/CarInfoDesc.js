import styled from 'styled-components'
import {useContext, useState} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import {Link} from "react-router-dom";
import {Button, Card, IconButton} from "@mui/material";
import CarInfoTable from "./CarInfoTable";
import AccordionComponent from "../../components/AccordionComponent";
import CarInfoColor from "./CarInfoColor";
import CarInfoCustom from "./CarInfoCustom";
import {priceFormatter} from "../../Formatter";


const CarDescContainer = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 1200px;
		margin: 10px auto;
`

const CarDescCard = styled(Card)`
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
		font-size: 1.4em;
		font-weight: bold;
		margin: 10px auto;
		position: relative;
`

const CarImage = styled.img`
		width: 500px;
`

const CarDescription = styled(Card)`
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		height: 200px;
		margin: 10px;
		padding: 10px 30px;
`

const CarCardInfoContainer = styled.div``

const ManufacturerContainer = styled.div`
	position: absolute;
		left: 10px;
		top: 10px;
`

const ManufacturerButton = styled(IconButton)`
		width: 60px;
		height: 60px;
`

const ManufacturerLogo = styled.img`
		width: 100%;
`

const CustomizeContainer = styled.div``

const CustomizeButton = styled(Button)``

const CarDescText = styled.div``

const CarSummary = styled.div`
		font-weight: bold;
		font-size: 1.4em;
		font-style: italic;
`

const AccordionContainer = styled.div`
		width: 80%;
		margin: 30px auto;
`


const CarInfoDesc = () => {
	
	const {carInfo} = useContext(CarInfoContext)
	
	const [visible, setVisible] = useState({table:false})
	
	
	return (
		<CarDescContainer>
			{carInfo &&
				<CarDescCard>
					<CarImage src={carInfo.carFrontUrl || "/testimages/sonata_001.png"}/>
					<ManufacturerContainer>
						<Link to={`/brand/${carInfo.manufacturerName}`}>
							<ManufacturerButton >
								<ManufacturerLogo src={carInfo.manufacturerUrl || "/testlogos/hyundai.png"} />
							</ManufacturerButton>
						</Link>
					</ManufacturerContainer>
					<CarDescription>
						<CarCardInfoContainer>
							{carInfo.carName || "소나타"}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							차종 : {carInfo.classification || "세단"}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							엔진 : {carInfo.engineType || "가솔린"}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							가격 : {carInfo.carPrice ? priceFormatter(carInfo.carPrice) : priceFormatter(30000000)}
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
				<CarSummary>
					"{carInfo.summary || "Stylish sedan with excellent fuel efficiency and performance."}"
				</CarSummary>
				<CarDescText>
					{carInfo.carDesc || "The Hyundai Sonata is a stylish and efficient sedan with a powerful gasoline engine and great fuel efficiency."}
				</CarDescText>
			</CarDescription>
			<AccordionContainer>
				<CarInfoColor/>
			</AccordionContainer>
			<AccordionContainer>
				<CarInfoCustom/>
			</AccordionContainer>
			<AccordionContainer>
				<AccordionComponent label={`실제 차량 정보와 다를 수 있습니다.`} id="table" name="재원 정보" visible={visible} setVisible={setVisible}>
					<CarInfoTable/>
				</AccordionComponent>
			</AccordionContainer>
		</CarDescContainer>
	)
}
export default CarInfoDesc;
