import HomeBrandImage from "./HomeBrandImage";
import {
  Container,
  SubContainer,
  Button,
  ButtonContainer,
} from "../../styles/home/HomeBrand";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import {Navigation, Pagination} from "swiper/modules";

const HomeBrand = () => {
  const brandList = [
    {
      name: "SONATA",
      image: "/testimages/sonata_009.png",
      hoverimage: "/testimages/sonata_001.png",
      link: "#",
      logo: "/testlogos/HYUNDAI.png",
    },
    {
      name: "K9",
      image: "/testimages/abp_01.png",
      hoverimage: "/testimages/abp_60.png",
      link: "#",
      logo: "/testlogos/KIA.png",
    },
    {
      name: "GV80",
      image: "/testimages/GV80/gv80-coupe-black.png",
      hoverimage: "/testimages/GV80/gv80-coupe-black.png",
      link: "#",
      logo: "/testlogos/GENESIS.png",
    },
    {
      name: "Q8",
      image: "/testimages/Q8/GWM2.jpg",
      hoverimage: "/testimages/Q8/GWM0.jpg",
      link: "#",
      logo: "/testlogos/AUDI.png",
    },
    {
      name: "EV6",
      image: "/testimages/swp_01.png",
      hoverimage: "/testimages/swp_63.png",
      link: "#",
      logo: "/testlogos/KIA.png",
    },
  ];
  const groupedBrandList = groupArray(brandList, 4);

  function groupArray(arr, groupSize) {
    const groups = [];
    for (let i = 0; i < arr.length; i += groupSize) {
      groups.push(arr.slice(i, i + groupSize));
    }
    return groups;
  }
  // 반응형 웹으로 구성해야 할지 논의 필요
  // hover image 추가 -> 커서 올릴 시 다른 각도의 차 이미지로 변경하게끔 구현
  // Button 추가 예정
  // 밑에 다음 슬라이드로 넘어가는 표시 추가 예정
  return (
    <>
      <Container>
        <Swiper
          navigation={{
            nextEl: ".next",
            prevEl: ".prev",
          }}
          pagination={true}
          modules={[Navigation, Pagination]}
          loop={true}
          slidesPerView={1}
          simulateTouch={true}
        >
          {groupedBrandList.map((group, index) => (
            <SwiperSlide key={index}>
              <SubContainer className="brand-group">
                {group.map((brand) => (
                  <HomeBrandImage
                    key={brand.name}
                    name={brand.name}
                    image={brand.image}
                    hoverimage={brand.hoverimage}
                    link={brand.link}
                    logo={brand.logo}
                  />
                ))}
              </SubContainer>
            </SwiperSlide>
          ))}
        </Swiper>
        <ButtonContainer>
          <Button className="prev" />
          <Button className="next" />
        </ButtonContainer>
      </Container>
    </>
  );
};
export default HomeBrand;
