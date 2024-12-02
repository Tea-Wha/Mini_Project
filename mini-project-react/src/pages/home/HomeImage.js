import styled, {css} from "styled-components";

const ImageContainer = styled.div`
		background-image: ${(props) => props.image};
		object-fit: cover;
		display : flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
`


const HomeImage = () => {

	
	return (
		<ImageContainer image="#">
		
		</ImageContainer>
	)
}

export default HomeImage