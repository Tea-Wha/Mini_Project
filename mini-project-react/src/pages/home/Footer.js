import styled, {css} from "styled-components";
import {FootContainer, Initial} from "../../styles/home/HomeFooter";

const Footer = () => {
  return (
    <FootContainer>
      <p>© 2024 CHANAWA Korea Ltd. | All Rights Reserved</p>
      <p>
        ※ 표기된 연비는 표준 모드에 의한 것으로 도로상태, 운전방법, 차량적재,
        정비상태 및 외기온도에 따라 실주행연비와 차이가 있습니다.
      </p>
      <Initial>CHANAWA</Initial>
    </FootContainer>
  );
};

export default Footer;
