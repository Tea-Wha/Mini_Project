import {Button} from "@mui/material";


const SearchArrange = ({ sort, setSortBy }) => {
	const handleSortClick = (sortBy) => {
		console.log(sortBy);
		setSortBy(sortBy); // 기준에 따라 정렬 상태 변경
	};
	const sortList = [
		{id: "car_Name", name: "이름순",},
		{id: "price", name: "가격순",},]
	
	return (
		<>
			{sortList.map((item) => (
				<Button key={item.id} onClick={() => handleSortClick(item.id)}>
					{item.name}{" "}
					{sort.sortBy === item.id && (sort.sortType === "asc" ? "▲" : "▼")}
				</Button>
			))}
		</>
	)
}

export default SearchArrange;