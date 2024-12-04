import HomeBrandImage from "./HomeBrandImage";
import {
  Container,
  SubContainer,
  Button,
  ButtonContainer,
} from "../../styles/home/HomeBrand";

const HomeBrand = () => {
  const brandList = [
    {
      name: "SONATA",
      image: "/testimages/sonata_009.png",
      hoverimage: "/testimages/sonata_001.png",
      link: "#",
    },
    {
      name: "TUCSON",
      image: "/testimages/tucson_009.png",
      hoverimage: "/testimages/tucson_001.png",
      link: "#",
    },
    {
      name: "K9",
      image: "/testimages/abp_01.png",
      hoverimage: "/testimages/abp_63.png",
      link: "#",
    },
    {
      name: "EV6",
      image: "/testimages/swp_01.png",
      hoverimage: "/testimages/swp_63.png",
      link: "#",
    },
  ];
  // 반응형 웹으로 구성해야 할지 논의 필요
  // hover image 추가 -> 커서 올릴 시 다른 각도의 차 이미지로 변경하게끔 구현
  // Button 추가 예정
  // 밑에 다음 슬라이드로 넘어가는 표시 추가 예정
  return (
    <>
      <Container>
        <SubContainer>
          <ButtonContainer>
            <Button />
            <Button />
          </ButtonContainer>
          {brandList.map((brand) => (
            <HomeBrandImage
              key={brand.name}
              name={brand.name}
              image={brand.image}
              hoverimage={brand.hoverimage}
              link={brand.link}
            />
          ))}
        </SubContainer>
      </Container>
    </>
  );
};
export default HomeBrand;
