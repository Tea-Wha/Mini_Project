import { TextField, Box, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Divider from "@mui/material/Divider";

const SearchBar = ({ onSearch, value, onChange, placeholder}) => {
	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			onSearch(); // 엔터키 입력 시 검색
		}
	};
	
	const handleSearchClick = () => {
		onSearch(); // 버튼 클릭 시 검색
	};
	
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative' }}>
			{/* 검색창 */}
			<TextField
				variant="outlined"
				placeholder={placeholder}
				fullWidth
				value={value}
				onChange={onChange}
				onKeyDown={handleKeyDown} // 엔터키 이벤트
				sx={{
					'& .MuiOutlinedInput-root': {
						borderRadius: '24px', // 둥근 모서리
						backgroundColor: '#f1f3f4', // 밝은 배경색
						paddingLeft: '40px', // 아이콘 공간 확보
						'&:hover': {
							backgroundColor: '#e0e0e0', // 호버 시 약간 어두운 배경색
						},
						'&.Mui-focused': {
							borderColor: '#4285F4', // 구글 블루 테두리
							boxShadow: '0 0 5px rgba(66, 133, 244, 0.5)', // 포커스 시 강조 효과
						},
					},
					'& .MuiOutlinedInput-notchedOutline': {
						borderColor: 'transparent', // 기본 테두리 없애기
					},
				}}
			/>
			{/* 검색 아이콘 버튼 */}
			<IconButton
				onClick={handleSearchClick} // 버튼 클릭 시 검색
				sx={{
					position: 'absolute',
					right: '12px',
					top: '50%',
					transform: 'translateY(-50%)',
					color: '#333', // 아이콘 색상
					'&:hover': {
						backgroundColor: 'transparent', // 호버 시 배경 없음
					},
				}}
			>
				<SearchIcon />
			</IconButton>
		</Box>
	);
};

export default SearchBar;
