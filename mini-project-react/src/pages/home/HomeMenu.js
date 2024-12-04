import {
  CloseButton,
  MenuContainer,
  MenuGroup,
  MenuItem,
  StyledLink,
  StyledDiv,
} from "../../styles/home/HomeMenu";
import HomeSideMenu from "./HomeSideMenu";

// 부모 클래스에서 값을 알기 위해 부모에서 useState생성후 props로 내려줌
// myPageOpen 은 마이페이지부분 열기
// menuOpen 은 메뉴 전체부분 열기
const HomeMenu = ({setMenuOpen, subPageOpen, setSubPageOpen, menuOpen}) => {
  const menuList = [
    {name: "Search", link: "/search"},
    {name: "Customizing", link: "/estimate"},
  ];

  const toggleList = [
    {name: "Brand", id: "brand"},
    {name: "My Page", id: "myPage"},
  ];

  const onClickToggle = (e) => {
    setSubPageOpen({
      ...{myPage: false, brand: false},
      [e.target.id]: !subPageOpen[e.target.id],
    });
  };

  const onClickClose = () => {
    setMenuOpen(false);
    setSubPageOpen({myPage: false, brand: false});
  };
  // SideContainer로 따로 빼서 추가적인 작업 수월하게끔 변경 예정 (진행중)
  // 브랜드 쪽 SideContainer는 스크롤 추가해서 전체 브랜드 대표 차 진열 예정
  return (
    <>
      <MenuContainer isOpen={menuOpen} subPageOpen={subPageOpen}>
        <MenuGroup>
          {menuList.map((menu) => (
            <MenuItem key={menu.name}>
              <StyledLink to={menu.link}>{menu.name}</StyledLink>
              <StyledDiv></StyledDiv>
            </MenuItem>
          ))}
          {toggleList.map((menu) => (
            <MenuItem
              key={menu.id}
              id={menu.id}
              onClick={onClickToggle}
              isSubOpen={subPageOpen[menu.id]}
            >
              {menu.name}
              <StyledDiv></StyledDiv>
            </MenuItem>
          ))}
        </MenuGroup>
        {toggleList.map((menu, idx) => (
          <HomeSideMenu
            idx={idx}
            key={menu.id}
            id={menu.id}
            isSubOpen={subPageOpen[menu.id]}
          />
        ))}
        <CloseButton onClick={onClickClose}> </CloseButton>
      </MenuContainer>
    </>
  );
};

export default HomeMenu;
