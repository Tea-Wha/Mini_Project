import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";


const CartTable = ({cart}) => {
	
	
	
	return(
		<Table>
			<TableHead>
				<TableRow>
					<TableCell>
						항목
					</TableCell>
					<TableCell>
						선택내용
					</TableCell>
				</TableRow>
			</TableHead>
			<TableBody>
				<TableRow>
					<TableCell>
						색상
					</TableCell>
					<TableCell>
						{cart.cartColor}
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>
						옵션
					</TableCell>
					<TableCell>
						{cart.cartOption && cart.cartOption.split(',').map((item, index) => (
							<div key={index}>
								{item}
							</div>
						)
						)}
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}
export default CartTable