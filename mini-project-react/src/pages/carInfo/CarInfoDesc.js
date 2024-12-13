import styled from 'styled-components'
import {useContext, useState} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import {Link} from "react-router-dom";
import {Button, Card, IconButton, Skeleton} from "@mui/material";
import CarInfoTable from "./CarInfoTable";
import AccordionComponent from "../../components/AccordionComponent";
import CarInfoColor from "./CarInfoColor";
import CarInfoCustom from "./CarInfoCustom";
import {priceFormatter} from "../../Formatter";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


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

const CarImageContainer = styled.div`
		display: flex;
		justify-content: space-between;
		align-items: center;
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


const AccordionContainer = styled.div`
		width: 80%;
		margin: 30px auto;
`


const CarInfoDesc = () => {
	
	
	const {carInfo, colors} = useContext(CarInfoContext)
	
	const [index, setIndex] = useState(0)
	
	const [visible, setVisible] = useState({table:false})
	
	console.log(carInfo)
	
	const onDragImage = (direction) => {
		// 인덱스 이동 (다음, 이전 이미지)
		setIndex((prevIdx) => {
			if (direction === "next") {
				return (prevIdx + 1) % colors.length; // 다음 이미지
			} else {
				return (prevIdx - 1 + colors.length) % colors.length; // 이전 이미지
			}
		});
	};
	
	return (
		<CarDescContainer>
			{carInfo && Object.keys(carInfo).length > 0 ?
				<CarDescCard>
					{colors && colors.length > 0 ?
						<CarImageContainer>
							<IconButton onClick={() => onDragImage("prev")}>
								<ArrowBackIosIcon />
							</IconButton>
							<CarImage src={colors[index].carUrl}/>
							<IconButton onClick={() => onDragImage("next")}>
								<ArrowForwardIosIcon />
							</IconButton>
						</CarImageContainer> :
						<Skeleton variant="rectangular" width={500} height={200} />}
					<ManufacturerContainer>
						<Link to={`/brand/${carInfo.manufacturerName}`}>
							<ManufacturerButton >
								<ManufacturerLogo src={carInfo.manufacturerUrl || "/testlogos/hyundai.png"} />
							</ManufacturerButton>
						</Link>
					</ManufacturerContainer>
					<CarDescription>
						<CarCardInfoContainer>
							{carInfo.carName}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							차종 : {carInfo.classification}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							엔진 : {carInfo.engineType}
						</CarCardInfoContainer>
						<CarCardInfoContainer>
							가격 : {priceFormatter(carInfo.carPrice)}
						</CarCardInfoContainer>
						<CustomizeContainer>
							<Link to={`/customize/${carInfo.carNo}/false`}>
								<CustomizeButton variant="outlined">
									견적 보기
								</CustomizeButton>
							</Link>
						</CustomizeContainer>
					</CarDescription>
				</CarDescCard> :
				<CarDescCard><Skeleton variant="rectangular" width={1200} height={250}/></CarDescCard>
			}
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
