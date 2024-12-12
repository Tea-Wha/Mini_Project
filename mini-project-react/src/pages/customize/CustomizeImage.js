import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { CarInfoContext } from "../../context/CarInfoStore";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { IconButton} from "@mui/material";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"; // Firebase 최신 API 임포트

const CustomizeImageContainer = styled.div`
    position: fixed;
    width: 60%;
    height: 100%;
`;

const PreviewContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
`;

const CustomizeImage = () => {
	const { carInfo } = useContext(CarInfoContext);
	const [imageList, setImageList] = useState(["/testimages/sonata_001.png", "/testimages/sonata_009.png"]);
	const [currentIdx, setCurrentIdx] = useState(0);
	
	const onDragImage = (direction) => {
		setCurrentIdx((prevIdx) => {
			if (direction === "next") {
				return (prevIdx + 1) % imageList.length; // 다음 이미지
			} else {
				return (prevIdx - 1 + imageList.length) % imageList.length; // 이전 이미지
			}
		});
	};
	
	useEffect(() => {
		const listFiles = async () => {
			if (!carInfo.url) return; // carInfo.url이 없다면 실행하지 않음
			try {
				const storage = getStorage(); // Firebase Storage 인스턴스 생성
				const storageRef = ref(storage, carInfo.url); // 해당 URL에 대한 참조 생성
				const result = await listAll(storageRef); // 해당 폴더 내 모든 파일 목록 가져오기
				
				// map을 사용하여 비동기 처리
				const urls = await Promise.all(
					result.items.map((itemRef) => getDownloadURL(itemRef)) // getDownloadURL()을 비동기로 호출
				);
				
				setImageList(urls); // 이미지 목록 상태 업데이트
			} catch (error) {
				console.error("파일 가져오기 에러:", error);
			}
		};
		
		listFiles();
	}, [carInfo]);
	
	return (
		<CustomizeImageContainer>
			<PreviewContainer>
				{/* 왼쪽 버튼 */}
				<IconButton onClick={() => onDragImage("prev")}>
					<ArrowBackIosIcon/>
				</IconButton>
				{/* 이미지 표시 */}
				{imageList.length > 0 ? (
					<Image src={imageList[currentIdx]} alt={`Car image ${currentIdx}`} />
				) : (
					<p>이미지를 불러오는 중...</p>
				)}
				
				{/* 오른쪽 버튼 */}
				<IconButton onClick={() => onDragImage("next")}>
					<ArrowForwardIosIcon/>
				</IconButton>
			</PreviewContainer>
		</CustomizeImageContainer>
	);
};

export default CustomizeImage;
