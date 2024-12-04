import styled from "styled-components";
import {Link} from "react-router-dom";

const ItemContainer = styled.li``

const Image = styled.img``

const ItemName = styled.div``

const ItemEngineType = styled.div``

const ItemPrice = styled.div``

const SearchItem = ({item}) => {
	
	
	
	
	return (
		<ItemContainer>
			<Image src={item.image} alt="" />
			<ItemName>{item.carName}</ItemName>
			<Link to={`/brand?brand=${item.manufacturer}`}>{item.manufacturer}</Link>
			<ItemEngineType>{item.engineType}</ItemEngineType>
			<ItemPrice>{item.price}</ItemPrice>
		</ItemContainer>
	)
}
export default SearchItem;