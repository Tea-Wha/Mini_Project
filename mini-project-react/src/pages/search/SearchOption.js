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
		console.log("추가할 내용이 들어있는 리스트 : " + JSON.stringify(list))
		console.log("현재 담겨있는 값들 : " + value)
		const newValue = e.currentTarget.getAttribute('data-name'); // data-name 속성 값 가져오기
		console.log("새로 추가할 값 : " + newValue)
		if (value !== null && value.includes(newValue)) {
			setter(value.filter(item => item !== newValue)); // 값이 있으면 배열에서 제거
		} else {
			setter([...value, newValue]); // 값이 없으면 배열에 추가
		}
	}
	
	
	return (
		<OptionContainer visible={visible}>
			{list && list.map((item, index) => (
				<ToggleOption onClick={onClickToggleOption} key={index} data-name={item.name} variant={value.includes(item.name) ? "contained" : "outlined"}>
					<p>{item.name}</p>
					{item.image && <Image src={item.image} alt=""/>}
				</ToggleOption>
			))}
		</OptionContainer>
	)
}
export default SearchOption;