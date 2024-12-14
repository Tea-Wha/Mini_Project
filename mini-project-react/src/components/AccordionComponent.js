import React from "react";
import styled, { css } from "styled-components";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Chip,
  Typography,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

const AccordionCustom = styled(Accordion)``;

const AccordionSummaryCustom = styled(AccordionSummary)``;
const DividerCustom = styled(Divider)``;

const AccordionDetailsCustom = styled(AccordionDetails)``;

// name : 표시할 이름, id: 바꿀 값의 key, visible : 바꿀값들의 노출여부, setVisible : visible 바꾸는 역할, children : 하위 컴포넌트
const AccordionComponents = ({
  label,
  name,
  id,
  visible,
  setVisible,
  children,
  reversed,
}) => {
  return (
    <AccordionCustom
      expanded={visible[id]}
      onChange={() => setVisible({ ...visible, [id]: !visible[id] })}
      sx={visible ? { boxShadow: 3 } : { boxShadow: 3 }}
    >
      <AccordionSummaryCustom
        expandIcon={reversed ? <ExpandLess /> : <ExpandMore />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
      >
        <Typography>{name}</Typography>
      </AccordionSummaryCustom>
      <DividerCustom>
        <Chip label={label} size="small" />
      </DividerCustom>
      <AccordionDetailsCustom>
        {children} {/* 여기서 children을 렌더링합니다 */}
      </AccordionDetailsCustom>
    </AccordionCustom>
  );
};

export default AccordionComponents;
