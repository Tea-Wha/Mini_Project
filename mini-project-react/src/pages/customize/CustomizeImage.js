import { useState } from "react";
import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {IconButton, Skeleton} from "@mui/material";

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
    position: relative;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    cursor: grab;
`;

const CustomizeImage = ({ link }) => {
	const [currentIdx, setCurrentIdx] = useState(0);  // 현재 이미지 인덱스
	const [isDragging, setIsDragging] = useState(false);  // 드래그 상태
	const [dragStartX, setDragStartX] = useState(0);  // 드래그 시작 위치
	const [dragOffset, setDragOffset] = useState(0);  // 드래그된 거리
	
	const onDragImage = (direction) => {
		// 인덱스 이동 (다음, 이전 이미지)
		setCurrentIdx((prevIdx) => {
			if (direction === "next") {
				return (prevIdx + 1) % link.length; // 다음 이미지
			} else {
				return (prevIdx - 1 + link.length) % link.length; // 이전 이미지
			}
		});
	};
	
	const handleMouseDown = (e) => {
		// 마우스 클릭 시, 드래그 시작
		setIsDragging(true);
		setDragStartX(e.clientX);  // 드래그 시작 위치
	};
	
	const handleMouseMove = (e) => {
		if (!isDragging) return; // 드래그 상태가 아니면 무시
		
		const distance = e.clientX - dragStartX; // 드래그된 거리 계산
		setDragOffset(distance); // 드래그된 거리 업데이트
		
		if (Math.abs(distance) > 50) {  // 드래그한 거리가 일정 크기 이상이면
			if (distance > 0) {
				onDragImage("prev");  // 왼쪽으로 드래그하면 이전 이미지
			} else {
				onDragImage("next");  // 오른쪽으로 드래그하면 다음 이미지
			}
			setDragStartX(e.clientX); // 드래그 시작 위치 업데이트 (반복적으로 조정)
			setDragOffset(0);  // 드래그된 거리 초기화
		}
	};
	
	const handleMouseUp = () => {
		// 마우스를 놓을 때, 드래그 종료
		setIsDragging(false);
		setDragOffset(0);  // 드래그된 거리 초기화
	};
	
	const handleMouseLeave = () => {
		// 마우스가 요소를 벗어나면 드래그 종료
		setIsDragging(false);
		setDragOffset(0);
	};
	
	return (
		<CustomizeImageContainer>
			<PreviewContainer
				onMouseMove={handleMouseMove} // 마우스를 움직일 때
				onMouseUp={handleMouseUp}  // 마우스를 놓을 때
				onMouseLeave={handleMouseLeave}  // 마우스가 요소를 벗어나면
			>
				{/* 왼쪽 버튼 */}
				<IconButton onClick={() => onDragImage("next")}>
					<ArrowBackIosIcon />
				</IconButton>
				
				{/* 이미지 표시 */}
				{link && link.length > 0 ? (
					<Image
						src={link[currentIdx]}
						alt={`Car image ${currentIdx}`}
						draggable={false}  // 기본 드래그 비활성화
						onMouseDown={handleMouseDown} // 마우스 클릭 시작
					/>
				) : (
					<Skeleton variant="rounded" width="100%" height="50%"/>
				)}
				
				{/* 오른쪽 버튼 */}
				<IconButton onClick={() => onDragImage("prev")}>
					<ArrowForwardIosIcon />
				</IconButton>
			</PreviewContainer>
		</CustomizeImageContainer>
	);
};

export default CustomizeImage;
