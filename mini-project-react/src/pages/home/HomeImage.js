import styled, {css} from "styled-components";
import {useEffect, useState} from "react";

const ImageContainer = styled.div`
		background-image: ${(props) => props.imageLink};
		object-fit: cover;
		display : flex;
		justify-content: flex-end;
		align-items: center;
`
const CircleButton = styled.button`
    background-color: ${({ selected }) => (selected ? "red" : "aquamarine")}; // selected일 때 red로 변경
		// 보여주기용
    width: 10px;
    height: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
`;

const HomeImage = () => {
	const [index, setIndex] = useState(0);
	const [autoScroll, setAutoScroll] = useState(null);
	
	const imageList = [
		"#",
		"#",
		"#",
		"#",
		"#",
	]
	
	
	const startAutoScroll = () => {
		// autoScroll을 시작하는 함수
		const interval = window.setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % imageList.length);
		}, 5000);
		setAutoScroll(interval);
	};
	
	const stopAutoScroll = () => {
		// autoScroll을 멈추는 함수
		if (autoScroll) {
			clearInterval(autoScroll);
			setAutoScroll(null);
		}
	};
	
	useEffect(() => {
		// 컴포넌트가 마운트되었을 때 autoScroll 시작
		startAutoScroll();
		
		// 컴포넌트가 unmount될 때 interval 정리
		return () => stopAutoScroll();
	}, []);
	
	const handleClickButton = (idx) => {
		setIndex(idx); // 버튼 클릭 시 인덱스 변경
		stopAutoScroll(); // 클릭하면 자동 스크롤 멈춤
		startAutoScroll(); // 그 뒤로 다시 autoScroll 시작
	};
	
	
	
	return (
		<ImageContainer imageLink={imageList[index]}>
			{imageList.map((image, idx) => (
				<CircleButton
					key={idx}
					selected={index === idx} // index와 일치하면 selected prop 전달
					onClick={() => handleClickButton(idx)} // 버튼 클릭 시 index 변경
				/>
			))}
		</ImageContainer>
	)
}

export default HomeImage;