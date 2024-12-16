import {useEffect, useState} from "react";
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
    width: 100%;
    height: 100%;
    position: relative;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
    width: 100%;
    height: 100%;
    object-fit: contain;
    cursor: grab;
    margin: 0 auto;
`;

const CustomizeImage = ({ link }) => {
	const [currentIdx, setCurrentIdx] = useState(0);
	const [compressedLinks, setCompressedLinks] = useState([]); // 압축된 이미지 URL 목록
	const [isDragging, setIsDragging] = useState(false);
	const [dragStartX, setDragStartX] = useState(0);
	
	// 마우스가 영역을 벗어나도 드래그 종료 처리
	useEffect(() => {
		const handleMouseUpGlobal = () => {
			if (isDragging) {
				setIsDragging(false);
			}
		};
		
		// 윈도우에서 마우스 업 이벤트를 감지하여 드래그 종료
		window.addEventListener("mouseup", handleMouseUpGlobal);
		window.addEventListener("mouseleave", handleMouseUpGlobal); // 마우스가 화면을 벗어날 때도 드래그 종료
		
		return () => {
			window.removeEventListener("mouseup", handleMouseUpGlobal);
			window.removeEventListener("mouseleave", handleMouseUpGlobal);
		};
	}, [isDragging]);
	
	
	// 이미지 압축 함수
	const compressImage = (url, quality = 0.8) => {
		return new Promise((resolve, reject) => {
			const img = new window.Image();
			img.src = url; // encodeURIComponent(url) 제거
			img.crossOrigin = "anonymous"; // CORS 설정
			console.log(img.src);
			
			// 이미지 로딩 성공
			img.onload = () => {
				try {
					const canvas = document.createElement("canvas");
					const ctx = canvas.getContext("2d");
					
					// 원본 이미지의 크기를 그대로 유지하거나 적당히 조정
					canvas.width = img.width /1.25;  // 필요에 맞게 조정
					canvas.height = img.height /1.25;
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
					
					// 이미지 형식에 맞는 압축 설정 (JPEG 또는 PNG)
					const imageType = img.src.includes("png") ? "image/png" : "image/jpeg";
					resolve(canvas.toDataURL(imageType, quality));  // 압축된 이미지 반환
				} catch (error) {
					// canvas 처리 중 오류 발생
					console.error("이미지 압축 중 오류:", error);
					reject(new Error("이미지 압축 중 문제가 발생했습니다."));
				}
			};
			
			// 이미지 로딩 실패
			img.onerror = (err) => {
				console.error("이미지 로드 중 오류:", err);
				reject(new Error("이미지 로딩에 실패했습니다. URL이 유효한지 확인해주세요."));
			};
		});
	};
	
	
	
	
	
	
	// 링크 압축 및 저장
	useEffect(() => {
		if (link && link.length > 0) {
			const compressAll = async () => {
				const compressed = await Promise.all(
					link.map((url) => compressImage(url))
				);
				setCompressedLinks(compressed);
			};
			
			compressAll().catch((err) => console.error("이미지 압축 중 오류:", err));
		}
	}, [link]);
	
	const handleMouseDown = (e) => {
		setIsDragging(true);
		setDragStartX(e.clientX);
	};
	
	const handleMouseMove = (e) => {
		if (!isDragging) return;
		
		const distance = e.clientX - dragStartX;
		if (Math.abs(distance) > 50) {
			setCurrentIdx((prevIdx) =>
				distance > 0
					? (prevIdx - 1 + compressedLinks.length) % compressedLinks.length
					: (prevIdx + 1) % compressedLinks.length
			);
			setDragStartX(e.clientX);
		}
	};
	
	const handleMouseUp = () => setIsDragging(false);
	
	return (
		<CustomizeImageContainer>
			<PreviewContainer
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
			>
				{compressedLinks.length > 1 && (
					<IconButton onClick={() => setCurrentIdx((currentIdx - 1 + compressedLinks.length) % compressedLinks.length)}>
						<ArrowBackIosIcon />
					</IconButton>
				)}
				
				{compressedLinks.length > 0 ? (
					<Image
						src={compressedLinks[currentIdx]}
						alt={`Car image ${currentIdx}`}
						draggable={false}
						onMouseDown={handleMouseDown}
						isDragging={isDragging} // 드래그 상태에 따라 커서 변경
					/>
				) : (
					<Skeleton variant="rounded" width="100%" height="50%" />
				)}
				
				{compressedLinks.length > 1 && (
					<IconButton onClick={() => setCurrentIdx((currentIdx + 1) % compressedLinks.length)}>
						<ArrowForwardIosIcon />
					</IconButton>
				)}
			</PreviewContainer>
		</CustomizeImageContainer>
	);
};

export default CustomizeImage;
