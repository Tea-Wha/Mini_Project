import styled from "styled-components";
import {Link} from "react-router-dom";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel} from "@mui/material";


export const StyledLink = styled(Link)`
    text-decoration: none;
`;

export const ItemContainer = styled(TableContainer)`
    margin-top: 16px;
`;
export const ItemTableSort = styled(TableSortLabel)``

export const ItemTable = styled(Table)``

export const ItemTableBody = styled(TableBody)``

export const ItemTableHead = styled(TableHead)``;

export const ItemTableRow = styled(TableRow)``;

export const ItemTableCell = styled(TableCell)`
`;

export const Image = styled.img`
  width: 100px; /* 이미지 크기 조정 */
  height: auto;
`;