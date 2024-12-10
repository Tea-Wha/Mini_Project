import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Divider, Chip, Typography } from '@mui/material';
import {ExpandLess, ExpandMore} from '@mui/icons-material';
import Paper from "@mui/material/Paper";

// name : 표시할 이름, id: 바꿀 값의 key, visible : 바꿀값들의 노출여부, setVisible : visible 바꾸는 역할, children : 하위 컴포넌트
const AccordionComponents = ({ label, name, id, visible, setVisible, children, reversed }) => {
	return (
		<Accordion expanded={visible[id]} onChange={() => setVisible({ ...visible, [id]: !visible[id] })} sx={{ boxShadow: 3 }}>
			<AccordionSummary
				expandIcon={reversed ? <ExpandLess/> : <ExpandMore/>}
				aria-controls={`${id}-content`}
				id={`${id}-header`}
			>
				<Typography>{name}</Typography>
			</AccordionSummary>
			<Divider>
				<Chip label={label} size="small" />
			</Divider>
			<AccordionDetails>
				{children}  {/* 여기서 children을 렌더링합니다 */}
			</AccordionDetails>
		</Accordion>
	);
};

export default AccordionComponents;
