import styled from "styled-components";
import {Link} from "react-router-dom";
import SearchItem from "./SearchItem";

const ItemsContainer = styled.ul``

const SearchItems = ({list}) => {
	console.log(list);
	
	
	
	return (
		<ItemsContainer>
			{list ? (
				list.map((item) => {
					console.log(item); // 각 항목이 제대로 렌더링되는지 확인
					return (
						<Link to={`/carInfo/${item.carNo}`} key={item.carName}>
							<SearchItem item={item} />
						</Link>
					);
				})
			) : (
				<p>No items found.</p>
			)}
		</ItemsContainer>
	)
}
export default SearchItems;