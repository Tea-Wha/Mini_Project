import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserStore";
import BrandApi from "../../api/BrandApi";
import { Link } from "react-router-dom";
import {
  FindGroup,
  MenuGroup,
  MenuItem,
  MenuItemSmall,
  MenuSideContainer,
  MenuLogo,
  StyledLink,
  MenuItemBrand,
} from "../../styles/home/HomeSideMenu";

const HomeSideMenu = ({ id, isSubOpen, idx }) => {
  const { logout } = useContext(UserContext);
  const [brandList, setBrandList] = useState([]);
  const [sideMenuList, setSideMenuList] = useState([]);
  const nickname = localStorage.getItem("nickName");
  
  // 통신을 통해 브랜드 목록을 가져옵니다
  useEffect(() => {
    const fetch = async () => {
      try {
        const rsp = await BrandApi.getBrandList();
        console.log(rsp);
        setBrandList(rsp.data);
      } catch (e) {
        console.log("통신 진행중 실패");
        console.log(e);
      }
    };
    fetch();
  }, []);
  
  // sideMenuList를 동적으로 설정
  useEffect(() => {
    if (nickname) {
      setSideMenuList([
        {
          name: "login",
          content: [
            { name: nickname + "님 안녕하세요", link: "#", type: "text" },
            { name: "내 정보", link: "/myPage" },
            { name: "장바구니 보기", link: "/cart" },
            { name: "로그아웃", link: "/", onclick: logout },
            {
              half: true,
              content: [
                { name: "아이디 찾기", link: "/findId" },
                { name: "비밀번호 찾기", link: "/findPw" },
              ],
            },
          ],
        },
      ]);
    } else {
      setSideMenuList([
        {
          name: "guest",
          content: [
            { name: "Log in", link: "/login" },
            { name: "Sign up", link: "/join" },
            {
              half: true,
              content: [
                { name: "아이디 찾기", link: "/findId" },
                { name: "비밀번호 찾기", link: "/findPw" },
              ],
            },
          ],
        },
      ]);
    }
  }, [nickname, logout]);
  
  const featureList = [];
  
  // 브랜드 메뉴 항목을 동적으로 추가
  useEffect(() => {
    if (brandList.length > 0) {
      setSideMenuList((prevMenuList) => [
        ...prevMenuList,
        {
          name: "brand",
          content: brandList.map((brand) => ({
            name: brand.brandName,
            link: `/brand/${brand.brandName}`,
            featured: !featureList.includes(`${brand.brandName}`),
            logoImageLink: brand.brandUrl,
          })),
        },
      ]);
    }
  }, [brandList]);
  
  const selector = () => {
    switch (id) {
      case "myPage":
        return nickname ? "login" : "guest";
      case "brand":
        return "brand";
      default:
        console.error("Invalid ID");
        return null;
    }
  };
  
  useEffect(() => {
    document.body.style.overflow =
      id === "brand" && isSubOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [id, isSubOpen]);
  
  const renderMenuContent = (menu) => {
    const filteredContent = menu.content.filter(
      (item) => item.name !== "로그아웃"
    );
    const lastItemIndex = filteredContent.length - 1;
    
    return filteredContent.map((item, index) => {
      if (item.type === "text") {
        return <p key={item.name}>{item.name}</p>;
      }
      
      if (item.half) {
        return (
          <FindGroup key={item.name}>
            {item.content.map((subItem) => (
              <Link to={subItem.link} key={subItem.name}>
                <MenuItemSmall isSubOpen={isSubOpen}>
                  {subItem.name}
                </MenuItemSmall>
              </Link>
            ))}
          </FindGroup>
        );
      }
      
      if (item.featured) {
        return (
          <StyledLink to={item.link} key={item.name}>
            <MenuItemBrand isSubOpen={isSubOpen}>
              {item.name}
              <MenuLogo isSubOpen={isSubOpen} logo={item.logoImageLink} />
            </MenuItemBrand>
          </StyledLink>
        );
      }
      
      return (
        <>
          <Link to={item.link} key={item.name}>
            <MenuItem isSubOpen={isSubOpen}>{item.name}</MenuItem>
          </Link>
          {index === lastItemIndex && (
            <MenuItem
              as="button"
              onClick={logout}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              로그아웃
            </MenuItem>
          )}
        </>
      );
    });
  };
  
  const selectedMenu = sideMenuList.find((menu) => menu.name === selector());
  
  return (
    <MenuSideContainer isSubOpen={isSubOpen} idx={idx}>
      <MenuGroup isSubOpen={isSubOpen}>
        {selectedMenu ? renderMenuContent(selectedMenu) : null}
      </MenuGroup>
    </MenuSideContainer>
  );
};

export default HomeSideMenu;
