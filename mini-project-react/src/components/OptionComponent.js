import styled, {css} from "styled-components";
import {Button, ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
import {useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';

const OptionContainer = styled.div`
		box-sizing: border-box;
		display: flex;
		border-radius: 8px;
		margin: 10px;
		justify-content: space-evenly;
		align-items: start;
		`


//버튼을 일괄적으로 처리하기 위한 ToggleButton
//https://mui.com/material-ui/react-toggle-button/
const OptionGroup = styled(ToggleButtonGroup)`
    box-sizing: border-box;
    display: flex;
		flex-wrap: wrap;
		width: 90%;
		
`;

//https://mui.com/material-ui/react-toggle-button/
const ToggleOption = styled(ToggleButton)`
    box-sizing: border-box;
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100px;
		height: 100px;
  
`

const ToggleButtonContainer = styled.div`
    box-sizing: border-box;
		display: flex;
		position: relative;
		flex-direction: column;
		width: 100px;
		height: 100px;
		
`

const ToggleContainer = styled.div`
    box-sizing: border-box;
		width: 100px;
		height: 100px;
		border-radius: 8px;
		border: 2px solid lightgray;
		overflow: hidden;
		padding: 0;
		margin: 10px;
    ${(props) =>
            props.selected &&
            css`
                border-color: #4285F4; // 구글 블루 테두리
                box-shadow: 0 0 6px rgba(66, 133, 244, 0.5); // 포커스 시 강조 효과
        `}
`

const CloseButton = styled(Button)`
    box-sizing: border-box;
`

const Image = styled.img`
    box-sizing: border-box;
		width: 50px;
		margin: 0 auto;
`
// value 는 제조사, 엔진, 차종별 선택사항을 저장하는 공간
// setter 는 이를 바꿔주는 함수
// list 는 전체 선택사항을 담은 리스트
// visible 은 해당 요소가 보일지 안보일지를 결정하는 메서드
const OptionComponent = ({value, setter, list, visible, setVisible, id, keyName, keyUrl, isBg }) => {
	console.log(visible)
	
	const [formats, setFormats] = useState(() => value);
	
	const handleFormat = (event, newFormats) => {
		console.log(newFormats);
		if (id === "color") {
			// 'color'일 때는 단일 선택만 허용
			if (newFormats.length > 1) {
				// 마지막으로 선택한 값을 유지
				const selected = newFormats[newFormats.length - 1];
				setFormats([selected]);
				setter([selected]);
			} else {
				setFormats(newFormats);
				setter(newFormats);
			}
		} else {
			setFormats(newFormats);
			setter(newFormats);
		}
	};
	// 상태및 요소 초기화 함수
	const onClickValueOff = () => {
		setter([])
		setFormats([])
		setVisible({...visible, [id]:false})
	}
	
	return (
		<OptionContainer visible={visible[id]}>
			<OptionGroup
				onChange={handleFormat}
				value={formats}>
				{list && list.map((item, index) => (
					<ToggleContainer selected={isBg && formats.includes(item[keyName])}>
						{isBg ?
							<Tooltip title={item[keyName]}>
								<ToggleOption key={index} color="primary"
								              value={item[keyName]}
								              sx={{border: "none", padding: 0, position: "relative",
									              background: `url(${item[keyUrl]}) no-repeat center/cover`,
								              }}>
								</ToggleOption>
							</Tooltip>
							:
							<ToggleOption key={index} color="primary"
							              value={item[keyName]}
							              sx={{border: "none", padding: 0, position: "relative"}}>
								<ToggleButtonContainer>
									<p>{item[keyName]}</p>
									{item[keyUrl] && <Image src={item[keyUrl]} alt=""/>}
								</ToggleButtonContainer>
							</ToggleOption>}
					</ToggleContainer>
				))}
			
			</OptionGroup>
			<Tooltip title="선택 내용 초기화">
				<CloseButton onClick={onClickValueOff} variant="outlined">
					<ClearIcon/>
				</CloseButton>
			</Tooltip>
		</OptionContainer>
	)
}
export default OptionComponent;