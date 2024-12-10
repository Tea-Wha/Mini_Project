import styled from "styled-components";

const StyledIframe = styled.iframe`
		position: fixed;
    width: 70%;
		height: 100%;
		
`


const CustomizeCanvas = ({url}) => {
	
	
	
	
	return (
		<StyledIframe src={url ? url:"https://showcase.tempest-vr.com/casperev_v2/"}>
		</StyledIframe>
	)
}

export default CustomizeCanvas