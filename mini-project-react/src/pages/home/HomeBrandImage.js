import styled from "styled-components";
import {Link} from "react-router-dom";


const BrandImageButton = styled.button`
    background-image: url(${(props) => props.imageLink});
		display: flex;
		object-fit: cover;
		width: 300px;
		height: 200px;
`

const HomeBrandImage = ({name, image, link}) => {
	
	return (
		<Link to={link}>
			<BrandImageButton imageLink={image}>
				{name}
			</BrandImageButton>
		</Link>
	)
}
export default HomeBrandImage
