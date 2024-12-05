import styled, {css} from "styled-components";
import {ToggleButton, ToggleButtonGroup} from "@mui/material";
import {useState} from "react";
import {ButtonContainer} from "../../styles/home/HomeBrand";

//https://mui.com/material-ui/react-toggle-button/
const OptionContainer = styled(ToggleButtonGroup)`
    display: flex;
		flex-wrap: wrap;
		margin: 10px;
`;

const ToggleOption = styled(ToggleButton)`
		display: flex;
		flex-direction: column;
		position: relative;
		width: 100px;
		height: 100px;
		margin: 10px;
`

const ToggleButtonContainer = styled.div`
		position: relative;
		width: 100px;
		height: 100px;
    margin: 10px;
`


const Image = styled.img`
		width: 50px;
`

const SearchOption = ({value, setter, list, visible}) => {
	console.log(visible)
	
	const [formats, setFormats] = useState(() => value);
	
	const handleFormat = (event, newFormats) => {
		console.log(newFormats);
		setFormats(newFormats);
		setter(newFormats);
	};
	
	
	return (
		<OptionContainer
			sx={{ display: visible ? "flex" : "none",
				border: "1px solid lightgray", // 그룹에 테두리 추가
				borderRadius: 2,}}
			onChange={handleFormat}
			variant="text"
			value={formats}>
			{list && list.map((item, index) => (
				<ToggleButtonContainer>
					<ToggleOption key={index}
					              value={item.name}
					              sx={{border: "1px solid lightgray", overflow: "hidden"}}
					              color="primary">
						<p>{item.name}</p>
						{item.image && <Image src={item.image} alt=""/>}
					</ToggleOption>
				</ToggleButtonContainer>
			))}
		</OptionContainer>
	)
}
export default SearchOption;