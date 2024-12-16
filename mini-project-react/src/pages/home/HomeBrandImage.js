import {
  StyledLink,
  BrandImageButton,
  StyledLegend,
  StyledLabel,
  StyledImage,
} from "../../styles/home/HomeBrandImage";

// 차량별 로고 추가 및 글 위치 변경 필요 (div로 감싸서 name 위치 바꾸기 등)
// 차 별 간단한 설명 추가?
// 버튼 추가 해서 -> 계속 넘기는 방식으로 여러 차 전시
const HomeBrandImage = ({ name, image, hoverimage, link, logo }) => {
  return (
    <StyledLink to={link} name={name}>
      <BrandImageButton>
        <StyledLegend name={name}>{name}</StyledLegend>
        <StyledLabel name={name} logoimageLink={logo}></StyledLabel>
        <StyledImage
          name={name}
          imageLink={image}
          hoverimageLink={hoverimage}
        ></StyledImage>
      </BrandImageButton>
    </StyledLink>
  );
};
export default HomeBrandImage;
