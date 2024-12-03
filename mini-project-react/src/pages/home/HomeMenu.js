import {Link} from "react-router-dom";
import {
  MenuContainer,
  MenuSideContainer,
  MenuGroup,
  MenuItem,
  CloseButton,
  MenuItemSmall,
  FindGroup,
} from "../../styles/home/HomeMenu";

// 부모 클래스에서 값을 알기 위해 부모에서 useState생성후 props로 내려줌
// myPageOpen 은 마이페이지부분 열기
// menuOpen 은 메뉴 전체부분 열기
const HomeMenu = ({setMenuOpen, myPageOpen, setMyPageOpen, menuOpen}) => {
  const nickname = localStorage.getItem("nickname");

  const menuList = [
    {name: "Search", link: "/search"},
    {name: "Brand Type", link: "/brands"},
    {name: "Customizing", link: "/estimate"},
  ];
  const loginMenuList = [
    {name: "Log in", link: "/login"},
    {name: "Sign up", link: "/signup"},
  ];
  const findMenuList = [
    {name: "아이디 찾기", link: "/findId"},
    {name: "비밀번호 찾기", link: "/findPw"},
  ];
  const myPageList = [
    {name: "내 정보", link: "/myPage"},
    {name: "위시리스트 보기", link: "/wishList"},
    {name: "장바구니 보기", link: "/cart"},
  ];

  const onClickMyPage = () => {
    setMyPageOpen(!myPageOpen);
    console.log(!myPageOpen);
  };

  const onClickClose = () => {
    setMenuOpen(false);
    setMyPageOpen(false);
  };

  return (
    <>
      <MenuContainer isOpen={menuOpen}>
        <MenuGroup>
          {menuList.map((menu) => (
            <Link to={menu.link}>
              <MenuItem key={menu.name}>{menu.name}</MenuItem>
            </Link>
          ))}
          <MenuItem onClick={onClickMyPage}>My Page</MenuItem>
        </MenuGroup>
        <MenuSideContainer isMypage={myPageOpen}>
          <MenuGroup>
            {nickname
              ? myPageList.map((menu) => (
                  <Link to={menu.link}>
                    <MenuItem key={menu.name}>{menu.name}</MenuItem>
                  </Link>
                ))
              : loginMenuList.map((menu) => (
                  <Link to={menu.link}>
                    <MenuItem key={menu.name}>{menu.name}</MenuItem>
                  </Link>
                ))}
            <FindGroup>
              {nickname ? (
                <p>{nickname} 님 어서오세요</p>
              ) : (
                findMenuList.map((menu) => (
                  <Link to={menu.link}>
                    <MenuItemSmall key={menu.name}>{menu.name}</MenuItemSmall>
                  </Link>
                ))
              )}
            </FindGroup>
          </MenuGroup>
          <CloseButton onClick={onClickClose}> X </CloseButton>
        </MenuSideContainer>
      </MenuContainer>
      {/* <MenuSideContainer>
        <MenuGroup isMypage={myPageOpen}>
          {nickname
            ? myPageList.map((menu) => (
                <Link to={menu.link}>
                  <MenuItem key={menu.name}>{menu.name}</MenuItem>
                </Link>
              ))
            : loginMenuList.map((menu) => (
                <Link to={menu.link}>
                  <MenuItem key={menu.name}>{menu.name}</MenuItem>
                </Link>
              ))}
          <FindGroup>
            {nickname ? (
              <p>{nickname} 님 어서오세요</p>
            ) : (
              findMenuList.map((menu) => (
                <Link to={menu.link}>
                  <MenuItemSmall key={menu.name}>{menu.name}</MenuItemSmall>
                </Link>
              ))
            )}
          </FindGroup>
        </MenuGroup>
        <CloseButton onClick={onClickClose}> X </CloseButton>
      </MenuSideContainer> */}
    </>
  );
};

export default HomeMenu;
