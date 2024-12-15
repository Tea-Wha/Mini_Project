import styled from 'styled-components'
import {useContext, useState} from "react";
import {Link} from "react-router-dom";
import {Button, Card, IconButton, Tooltip} from "@mui/material";
import CarInfoTable from "./CarInfoTable";
import AccordionComponent from "../../components/AccordionComponent";
import {BrandContext} from "../../context/BrandStore";


const CarDescContainer = styled.div`
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 1000px;
		margin: 100px auto;
`

const CarDescCard = styled(Card)`
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
		margin: 10px auto;
		position: relative;
`

const CarImage = styled.img`
		max-width: 300px;
		max-height: 150px;
		object-fit: cover;
`

const CarDescription = styled(Card)`
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
		width: calc(100% - 500px);
		height: 200px;
		margin: 10px;
`

const CarCardInfoContainer = styled.div``

const CarsContainer = styled.div`
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
		align-items: center;
`

const AccordionContainer = styled.div`
		width: 80%;
		margin: 30px auto;
`


const BrandDesc = () => {
	
	const {brand, brandCar} = useContext(BrandContext)
	
	const [visible, setVisible] = useState({table:false})
	
	return (
		<CarDescContainer>
			{brand &&
				<CarDescCard>
					<CarImage src={brand.brandUrl}/>
					<CarDescription>
						<CarCardInfoContainer>
							{brand.brandName}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							국가 : {brand.country}
						</CarCardInfoContainer>
					</CarDescription>
				</CarDescCard>}
			<AccordionContainer>
				<AccordionComponent label={`${brand.brandName }의 차량들입니다.`} id="table" name="차량 정보" visible={visible} setVisible={setVisible}>
					<CarsContainer>
						{Array.isArray(brandCar) && brandCar.map((car, index) => (
							<Link to={`/carInfo/${car.carNo}`} key={index}>
								<Tooltip key={index} title={car.carName + " " + car.carPrice} >
									<CarImage src={car.carFrontUrl} alt="image"></CarImage>
								</Tooltip>
							</Link>
						))}
					</CarsContainer>
				</AccordionComponent>
			</AccordionContainer>
		</CarDescContainer>
	)
}
export default BrandDesc;
