import {useContext, useEffect, useState} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import styled from "styled-components";
import CustomizeCanvas from "./CustomizeCanvas";
import CustomizeImage from "./CustomizeImage";
import carInfoApi from "../../api/CarInfoApi";

const PreviewContainer = styled.div`
		position: relative;
`

const CustomizePreview = ({carNo}) => {
	
	const { carColor} = useContext(CarInfoContext)
	const [link, setLink] = useState(null)
	const [option, setOption] = useState(true)
	
	useEffect(() => {
		const getCarImage = async () => {
			try {
				const rsp = await carInfoApi.getCarImage(carNo, carColor);
				console.log(rsp.data);
				//setOption(rsp.data.length === 1);
				setLink(rsp.data);
			}
			catch (e) {
				alert("이미지를 가져오는데 실패했습니다.")
			}
		}
		getCarImage()
	}, [carColor]);
	
	
	
	
	return (
		<PreviewContainer>
			{option ? <CustomizeCanvas link={link}/> : <CustomizeImage link={link}/>}
		</PreviewContainer>
	)
}
export default CustomizePreview;