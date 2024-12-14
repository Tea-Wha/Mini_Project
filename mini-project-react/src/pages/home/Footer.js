import styled, { css } from "styled-components";
import { FootContainer, Initial } from "../../styles/home/HomeFooter";
import { useContext } from "react";
import { UserContext } from "../../context/UserStore";

const Footer = () => {
  const { logout } = useContext(UserContext);

  const LogoutButton = styled.button`
    padding: 10px 20px;
    background-color: #ff4d4d;
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
    margin-top: 20px;

    &:hover {
      background-color: #ff1a1a;
    }
  `;
  return (
    <FootContainer>
      <p>© 2024 CHANAWA Korea Ltd. | All Rights Reserved</p>
      <p>※ 표기된 연비는 표준 모드에 의한 것으로 도로상태, 운전방법, 차량적재, 정비상태 및 외기온도에 따라 실주행연비와 차이가 있습니다.</p>
      <Initial>CHANAWA</Initial>

      <LogoutButton onClick={logout}>로그아웃</LogoutButton>
    </FootContainer>
  );
};

export default Footer;
