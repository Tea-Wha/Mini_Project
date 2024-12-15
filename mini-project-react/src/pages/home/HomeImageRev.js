import React, { useRef, useEffect, useState } from "react";
import {
  ImageContainer,
  CircleButton,
  Styleddiv,
  PauseButton,
  StartButton,
  StyledSwiper,
} from "../../styles/home/HomeImageTest";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const HomeImageTest = () => {
  const swiperRef = useRef(null);

  const imageList = [
    "/testimages/genesis-kr-g80.jpg",
    "/testimages/genesis-kr-g90.jpg",
    "/testimages/genesis-gv80.jpg",
    "/testimages/genesis-kr-g70.jpg",
    "/testimages/ioniq6_design.jpg",
    "/testimages/sonata_the_edge_design.jpg",
    "/testimages/the_all_new_kona_design.jpg",
    "/testimages/avante_n_highlights_usp.jpg",
    "/testimages/sportage.jpg",
    "/testimages/k8.jpg",
    "/testimages/ev6.jpg",
    "/testimages/g-class.webp",
    "/testimages/bmw8coupe.jpg",
    "/testimages/gt2.webp",
    "/testimages/gt.webp",
    "/testimages/hero.webp",
  ];

  const [selectedImages, setSelectedImages] = useState([]);

  const getRandomImages = (arr, count) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    const randomImages = getRandomImages(imageList, 5);
    setSelectedImages(randomImages);
  }, []);

  return (
    <Styleddiv>
      <StyledSwiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        centeredSlides={true}
        modules={[Navigation, Pagination, Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        slidesPerView={1}
        speed={500}
      >
        {selectedImages.map((image, idx) => (
          <SwiperSlide key={idx}>
            <ImageContainer imageLink={image}></ImageContainer>
          </SwiperSlide>
        ))}
      </StyledSwiper>
      {/* <PauseButton />
      <StartButton /> */}
    </Styleddiv>
  );
};

export default HomeImageTest;
