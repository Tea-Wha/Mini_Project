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
      name: "CONA",
      image: "/image/MainPage_Brand/HYUNDAI/CONA/010.png",
      hoverimage: "/image/MainPage_Brand/HYUNDAI/CONA/001.png",
      link: "#",
      logo: "/testlogos/HYUNDAI.png",
    },
    {
      name: "EV6",
      image: "/image/MainPage_Brand/KIA/EV6/agt_01.png",
      hoverimage: "/image/MainPage_Brand/KIA/EV6/agt_60.png",
      link: "#",
      logo: "/testlogos/KIA.png",
    },
    {
      name: "G-CLASS",
      image: "/image/MainPage_Brand/BENZ/G-CLASS/SSM0.webp",
      hoverimage: "/image/MainPage_Brand/BENZ/G-CLASS/SSM1.webp",
      link: "#",
      logo: "/testlogos/BENZ.png",
    },
    {
      name: "BMW8 COUPE",
      image: "/image/MainPage_Brand/BMW/BMW8_COUPE/SGM0.png",
      hoverimage: "/image/MainPage_Brand/BMW/BMW8_COUPE/SGM1.png",
      link: "#",
      logo: "/testlogos/BMW.png",
    },
    {
      name: "G70",
      image: "/image/MainPage_Brand/GENESIS/G70/genesis-g70.png",
      hoverimage: "/image/MainPage_Brand/GENESIS/G70/genesis-g70.png",
      link: "#",
      logo: "/testlogos/GENESIS.png",
    },
    {
      name: "Q8",
      image: "/image/MainPage_Brand/AUDI/Q8/GWM2.jpg",
      hoverimage: "/image/MainPage_Brand/AUDI/Q8/GWM0.jpg",
      link: "#",
      logo: "/testlogos/AUDI.png",
    },
    {
      name: "DBX",
      image: "/image/MainPage_Brand/ASTONMARTIN/DBX/1.png",
      hoverimage: "/image/MainPage_Brand/ASTONMARTIN/DBX/1.png",
      link: "#",
      logo: "/testlogos/ASTONMARTIN.png",
    },
    {
      name: "CONTINENTAL-GT",
      image: "/image/MainPage_Brand/BENTLEY/CONTINENTAL_GT/ESS1.webp",
      hoverimage: "/image/MainPage_Brand/BENTLEY/CONTINENTAL_GT/ESS0.webp",
      link: "#",
      logo: "/testlogos/BENTLEY.png",
    },
    {
      name: "TRAX",
      image: "/image/MainPage_Brand/CHEVROLET/TRAX/45.png",
      hoverimage: "/image/MainPage_Brand/CHEVROLET/TRAX/45.png",
      link: "#",
      logo: "/testlogos/CHEVROLET.png",
    },
    {
      name: "SF90",
      image: "/image/MainPage_Brand/FERRARI/SF90/45.jpg",
      hoverimage: "/image/MainPage_Brand/FERRARI/SF90/45.jpg",
      link: "#",
      logo: "/testlogos/FERRARI.png",
    },
    {
      name: "MSTANG GT",
      image: "/image/MainPage_Brand/FORD/MUSTANG_GT/45.jpg",
      hoverimage: "/image/MainPage_Brand/FORD/MUSTANG_GT/45.jpg",
      link: "#",
      logo: "/testlogos/FORD.png",
    },
    {
      name: "ACCORD TURBO",
      image: "/image/MainPage_Brand/HONDA/ACCORD_TURBO/color_11_360.png",
      hoverimage: "/image/MainPage_Brand/HONDA/ACCORD_TURBO/color_11_360.png",
      link: "#",
      logo: "/testlogos/HONDA.png",
    },
    {
      name: "GRAND CHEROKEE",
      image: "/image/MainPage_Brand/JEEP/GRAND_CHEROKEE/45.png",
      hoverimage: "/image/MainPage_Brand/JEEP/GRAND_CHEROKEE/45.png",
      link: "#",
      logo: "/testlogos/JEEP.png",
    },
    {
      name: "URUS",
      image: "/image/MainPage_Brand/LAMBORGHINI/URUS/90.png",
      hoverimage: "/image/MainPage_Brand/LAMBORGHINI/URUS/90.png",
      link: "#",
      logo: "/testlogos/LAMBORGHINI.png",
    },
    {
      name: "RANGE ROVER",
      image: "/image/MainPage_Brand/LANDROVER/RANGE_ROVER_SPORTS/1DF_2.png",
      hoverimage:
        "/image/MainPage_Brand/LANDROVER/RANGE_ROVER_SPORTS/1DF_1.png",
      link: "#",
      logo: "/testlogos/LANDROVER.png",
    },
    {
      name: "UX 300h",
      image: "/image/MainPage_Brand/LEXUS/UX_300H/45.png",
      hoverimage: "/image/MainPage_Brand/LEXUS/UX_300H/45.png",
      link: "#",
      logo: "/testlogos/LEXUS.png",
    },
    {
      name: "GRAN TURISMO",
      image: "/image/MainPage_Brand/MASERATI/GRAN_TURISMO/45.png",
      hoverimage: "/image/MainPage_Brand/MASERATI/GRAN_TURISMO/45.png",
      link: "#",
      logo: "/testlogos/MASERATI.png",
    },
    {
      name: "COOPER",
      image: "/image/MainPage_Brand/MINI/COOPER/3.png",
      hoverimage: "/image/MainPage_Brand/MINI/COOPER/2.png",
      link: "#",
      logo: "/testlogos/MINI.png",
    },
    {
      name: "E-2008",
      image: "/image/MainPage_Brand/PEUGEOT/E-2008/1.avif",
      hoverimage: "/image/MainPage_Brand/PEUGEOT/E-2008/1.avif",
      link: "#",
      logo: "/testlogos/PEUGEOT.png",
    },
    {
      name: "PANAMERA 4",
      image: "/image/MainPage_Brand/PORSCHE/PANAMERA_4/DSM3.webp",
      hoverimage: "/image/MainPage_Brand/PORSCHE/PANAMERA_4/DSM4.webp",
      link: "#",
      logo: "/testlogos/PORSCHE.png",
    },
    {
      name: "GRAND KOLEOS",
      image: "/image/MainPage_Brand/RENAULT/GRAND_KOLEOS/1.avif",
      hoverimage: "/image/MainPage_Brand/RENAULT/GRAND_KOLEOS/1.avif",
      link: "#",
      logo: "/testlogos/RENAULT.png",
    },
    {
      name: "GHOST",
      image: "/image/MainPage_Brand/ROLLSROYCE/GHOST/1.avif",
      hoverimage: "/image/MainPage_Brand/ROLLSROYCE/GHOST/1.avif",
      link: "#",
      logo: "/testlogos/ROLLSROYCE.png",
    },
    {
      name: "MODEL S",
      image: "/image/MainPage_Brand/TESLA/MODEL_S/45.png",
      hoverimage: "/image/MainPage_Brand/TESLA/MODEL_S/45.png",
      link: "#",
      logo: "/testlogos/TESLA.png",
    },
    {
      name: "CROWN",
      image: "/image/MainPage_Brand/TOYOTA/CROWN/FRONT.webp",
      hoverimage: "/image/MainPage_Brand/TOYOTA/CROWN/45.webp",
      link: "#",
      logo: "/testlogos/TOYOTA.png",
    },
    {
      name: "ARTEON",
      image: "/image/MainPage_Brand/VOLKSWAGEN/ARTEON/KBM0.jpg",
      hoverimage: "/image/MainPage_Brand/VOLKSWAGEN/ARTEON/KBM5.jpg",
      link: "#",
      logo: "/testlogos/VOLKSWAGEN.png",
    },
    {
      name: "S90",
      image: "/image/MainPage_Brand/VOLVO/S90/2.avif",
      hoverimage: "/image/MainPage_Brand/VOLVO/S90/1.avif",
      link: "#",
      logo: "/testlogos/TOYOTA.png",
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
          pagination={{
            type: "fraction",
          }}
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
