import {useContext} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import styled from "styled-components";
import CustomizeCanvas from "./CustomizeCanvas";
import CustomizeImage from "./CustomizeImage";

const PreviewContainer = styled.div`
		position: relative;
`

const CustomizePreview = () => {
	
	
	const option = false
	
	
	
	
	return (
		<PreviewContainer>
			{option ? <CustomizeCanvas/> : <CustomizeImage/>}
		</PreviewContainer>
	)
}
export default CustomizePreview;