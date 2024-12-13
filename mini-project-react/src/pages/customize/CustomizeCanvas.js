import styled from "styled-components";

const IframeContainer = styled.div`
    position: fixed;
    width: 70%;
    height: 100%;
    overflow: hidden;
`

const StyledIframe = styled.iframe`
    position: relative;
    left: -380px;
    width: calc(100% + 380px);
    height: 110%;
    border: none; /* border를 없애서 더 깔끔하게 보이게 합니다. */
`

const CustomizeCanvas = ({url}) => {
	return (
		<IframeContainer>
			<StyledIframe
				src={url ? url : "https://configurator.epeugeot.co.kr/visualizer/null/P6?_gl=1*luutac*_ga*MTEyNTY0NzI5Ny4xNzMyNDkzOTc2*_ga_QYNKFS2HMM*MTczNDA2NjM4Ni40LjEuMTczNDA2NjM5MC4wLjAuMA.."}
				sandbox="allow-scripts allow-same-origin" />
		</IframeContainer>
	);
}

export default CustomizeCanvas;
