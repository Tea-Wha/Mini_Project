import styled from "styled-components";
import {useContext} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

const CarDescTableContainer = styled(TableContainer)``

const CarDescTable = styled(Table)``

const CarDescTableHead = styled(TableHead)``

const CarDescTableData = styled(TableCell)``

const CarDescTableRow = styled(TableRow)``

const CarDescTableBody = styled(TableBody)``

const CarInfoTable = () => {
	
	const carInfo = useContext(CarInfoContext)
	
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
		<CarDescTableContainer component={Paper}>
			<CarDescTable size="small">
				<CarDescTableHead>
					<CarDescTableRow>
						<CarDescTableData>
							재원명
						</CarDescTableData>
						<CarDescTableData>
							수치
						</CarDescTableData>
					</CarDescTableRow>
				</CarDescTableHead>
				<CarDescTableBody>
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
				</CarDescTableBody>
			</CarDescTable>
		</CarDescTableContainer>
	)
}
export default CarInfoTable