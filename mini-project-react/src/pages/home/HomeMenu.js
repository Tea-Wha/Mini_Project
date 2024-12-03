import {Link} from "react-router-dom";
import {
  MenuContainer,
  MenuGroup,
  MenuItem,
  CloseButton,
  MenuItemSmall,
  FindGroup,
} from "../../styles/home/HomeMenu";

// 부모 클래스에서 값을 알기 위해 부모에서 useState생성후 props로 내려줌
// myPageOpen 은 마이페이지부분 열기
// menuOpen 은 메뉴 전체부분 열기
const HomeMenu = ({setMenuOpen, myPageOpen, setMyPageOpen}) => {
  const nickname = localStorage.getItem("nickname");

  const menuList = [
    {name: "차량 검색", link: "/search"},
    {name: "브랜드별 보기", link: "/brands"},
    {name: "견적 내기", link: "/estimate"},
  ];
  const loginMenuList = [
    {name: "로그인", link: "/login"},
    {name: "회원 가입", link: "/signup"},
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
  };

  const onClickClose = () => {
    setMenuOpen(false);
    setMyPageOpen(false);
  };

  return (
    <MenuContainer>
      <MenuGroup>
        {menuList.map((menu) => (
          <Link to={menu.link}>
            <MenuItem key={menu.name}>{menu.name}</MenuItem>
          </Link>
        ))}
        <MenuItem onClick={onClickMyPage}>내정보</MenuItem>
      </MenuGroup>
      {myPageOpen && (
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
      )}
      <CloseButton onClick={onClickClose}> X </CloseButton>
    </MenuContainer>
  );
};

export default HomeMenu;
