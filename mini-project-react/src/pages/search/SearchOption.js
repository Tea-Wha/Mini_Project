import styled, {css} from "styled-components";
import {Button, ToggleButton, ToggleButtonGroup, Tooltip} from "@mui/material";
import {useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';

const OptionContainer = styled.div`
		display: flex;
		border-radius: 8px;
		margin: 10px;
		justify-content: space-evenly;
		align-items: start;
		`


//버튼을 일괄적으로 처리하기 위한 ToggleButton
//https://mui.com/material-ui/react-toggle-button/
const OptionGroup = styled(ToggleButtonGroup)`
    display: flex;
		flex-wrap: wrap;
		width: 90%;
		
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
		position: relative;
		flex-direction: column;
		width: 100px;
		height: 100px;
		border-radius: 8px;
		border: 1px solid lightgray;
		
`

const CloseButton = styled(Button)`
`

const Image = styled.img`
		width: 50px;
		margin: 0 auto;
`
// value 는 제조사, 엔진, 차종별 선택사항을 저장하는 공간
// setter 는 이를 바꿔주는 함수
// list 는 전체 선택사항을 담은 리스트
// visible 은 해당 요소가 보일지 안보일지를 결정하는 메서드
const SearchOption = ({value, setter, list, visible, setVisible, id}) => {
	console.log(visible)
	
	const [formats, setFormats] = useState(() => value);
	
	const handleFormat = (event, newFormats) => {
		console.log(newFormats);
		setFormats(newFormats);
		setter(newFormats);
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
			<Tooltip title="선택 내용 초기화">
				<CloseButton onClick={onClickValueOff} variant="outlined">
					<ClearIcon/>
				</CloseButton>
			</Tooltip>
		</OptionContainer>
	)
}
export default SearchOption;