import styled, {css} from "styled-components";
import {Button} from "@mui/material";

const OptionContainer = styled.div`
    display: ${props => props.visible ? "flex" : "none"};
`;

const ToggleOption = styled(Button)``

const Image = styled.img`
width: 100px;
		height: 100px;
`

const SearchOption = ({value, setter, list, visible}) => {
	console.log(visible)
	
	const onClickToggleOption = e => {
		console.log(value)
		const newValue = e.target.value;
		if (value.includes(newValue)) {
			setter(value.filter(item => item !== newValue)); // 값이 있으면 배열에서 제거
		} else {
			setter([...value, newValue]); // 값이 없으면 배열에 추가
		}
	}
	
	// 리스트 확인용
	
	
	
	
	return (
		<OptionContainer visible={visible}>
			{list && list.map((item, index) => (
				<ToggleOption onClick={onClickToggleOption} key={index}>
					<p>{item.name}</p>
					{item.image && <Image src={item.image} alt=""/>}
				</ToggleOption>
			))}
			<ToggleOption onClick={onClickToggleOption}>
				<p>확인용</p>
				<Image src="/testimages/001.png" alt=""/>
			</ToggleOption>
		</OptionContainer>
	)
}
export default SearchOption;