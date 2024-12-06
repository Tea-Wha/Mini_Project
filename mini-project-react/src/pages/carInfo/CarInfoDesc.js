import styled from 'styled-components'
import {useContext} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import {Link} from "react-router-dom";

const CarDescContainer = styled.div``

const CarImage = styled.img``

const CarDescription = styled.div``

const CarPriceContainer = styled.div``

const ManufacturerButton = styled.button``

const ManufacturerLogo = styled.img``

const CarDescTable = styled.table``

const CarDescTableHead = styled.th``

const CarDescTableData = styled.td``

const CarDescTableRow = styled.tr``

const CarDescText = styled.div``

const CarSummary = styled.div``


const CarInfoDesc = () => {
	
	const [carInfo] = useContext(CarInfoContext)
	
	const resourceList = [
		{
			name: "엔진 종류",
			value: "engineType",
		},
		{
			name: "차종",
			value: "classification",
		},
		{
			name: "배기량(cc)",
			value: "displacement",
		},
		{
			name: "토크(N*m)",
			value: "torque",
		},
		{
			name: "연비(km/l)",
			value: "efficiency",
		},
		{
			name: "출력(hp)",
			value: "Power",
		},
	]
	
	
	
	return (
		<CarDescContainer>
			<CarImage src={carInfo.image} />
			<Link to={`/brand/:${carInfo.manufacturerCode}`}>
				<ManufacturerButton >
					<ManufacturerLogo src={carInfo.manufacturerName} />
				</ManufacturerButton>
			</Link>
			<CarDescription>
				<CarPriceContainer>
					{carInfo.price}
				</CarPriceContainer>
				<CarDescTable>
					<CarDescTableHead>
						<CarDescTableData>
							재원명
						</CarDescTableData>
						<CarDescTableData>
							수치
						</CarDescTableData>
					</CarDescTableHead>
					{resourceList.map((item, index) => (
					<CarDescTableRow>
						<CarDescTableData key={index}>
							{item.name}
						</CarDescTableData>
						<CarDescTableData>
							{carInfo[item.value]}
						</CarDescTableData>
					</CarDescTableRow>
					))}
				</CarDescTable>
				<CarDescText>
					{carInfo.carDesc}
				</CarDescText>
				<CarSummary>
					{carInfo.summary}
				</CarSummary>
			</CarDescription>
		</CarDescContainer>
	)
}
export default CarInfoDesc;
