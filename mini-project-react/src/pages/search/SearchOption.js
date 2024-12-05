import styled, {css} from "styled-components";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useState} from "react";

const OptionContainer = styled.div`
		display: flex;
		border-radius: 8px;
		margin: 10px;
		max-height: 0;
		overflow: hidden;
		opacity: 0;
		padding: 15px 30px;
		align-items: center;
		justify-content: center;
		z-index: -1;
    transition: max-height 0.6s ease-in-out, transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
    transform: translateY(-130%);
    ${(props) =>
            props.visible &&
            css`
		            z-index: 0;
		            opacity: 1;
                border: 1px solid lightgray;
		            height: auto;
		            transform: translateY(0);
		            max-height: 1000px;
    `}
`


//버튼을 일괄적으로 처리하기 위한 ToggleButton
//https://mui.com/material-ui/react-toggle-button/
const OptionGroup = styled(ToggleButtonGroup)`
    display: flex;
		flex-wrap: wrap;
		
`;

//https://mui.com/material-ui/react-toggle-button/
const ToggleOption = styled(ToggleButton)`
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100px;
		height: 100px;
`

const ToggleButtonContainer = styled.div`
		display: flex;
		flex-direction: column;
		width: 100px;
		height: 100px;
		border-radius: 8px;
		border: 1px solid lightgray;
		
`


const Image = styled.img`
		width: 50px;
`
// value 는 제조사, 엔진, 차종별 선택사항을 저장하는 공간
// setter 는 이를 바꿔주는 함수
// list 는 전체 선택사항을 담은 리스트
// visible 은 해당 요소가 보일지 안보일지를 결정하는 메서드
const SearchOption = ({value, setter, list, visible}) => {
	console.log(visible)
	
	const [formats, setFormats] = useState(() => value);
	
	const handleFormat = (event, newFormats) => {
		console.log(newFormats);
		setFormats(newFormats);
		setter(newFormats);
	};
	
	
	return (
		<OptionContainer visible={visible}>
			<OptionGroup
				onChange={handleFormat}
				variant="text"
				value={formats}>
				{list && list.map((item, index) => (
					<ToggleOption key={index}
					              value={item.name}
					              sx={{border: "none", padding: 0, marginRight: 2, marginY: 2}}
					              color="primary">
						<ToggleButtonContainer>
							<p>{item.name}</p>
							{item.image && <Image src={item.image} alt=""/>}
						</ToggleButtonContainer>
					</ToggleOption>
				))}
			</OptionGroup>
		</OptionContainer>
	)
}
export default SearchOption;