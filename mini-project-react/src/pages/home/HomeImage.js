import {useEffect, useState} from "react";
import {ImageContainer, CircleButton} from "../../styles/home/HomeImage";

const HomeImage = () => {
  const [index, setIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(null);

  const imageList = [
    "/testimages/001.png",
    "/testimages/genesis-kr-g80.jpg",
    "/testimages/genesis-kr-g90.jpg",
    "/testimages/genesis-gv80.jpg",
    "/testimages/genesis-kr-g70.jpg",
  ];

  const startAutoScroll = () => {
    // stpAutoScroll() 추가 -> autoscroll이 계속 겹쳐서 정해진 시간보다
    // 빨리 스크롤 되는 문제점 발생
    stopAutoScroll();
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
    clearInterval(autoScroll);
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
    <ImageContainer imageLink={imageList[index]} index={index}>
      {imageList.map((_, idx) => (
        <CircleButton
          key={idx}
          selected={index === idx} // index와 일치하면 selected prop 전달
          onClick={() => handleClickButton(idx)} // 버튼 클릭 시 index 변경
        />
      ))}
    </ImageContainer>
  );
};

export default HomeImage;
