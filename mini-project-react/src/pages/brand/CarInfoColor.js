import {useContext} from "react";
import {CarInfoContext} from "../../context/CarInfoStore";
import AccordionComponent from "../../components/AccordionComponent";


const CarInfoColor = () => {
	
	const colors = useContext(CarInfoContext)
	const [visible, setVisible] = React.useState({color: false})
	
	
	return (
		<AccordionComponent id="color" name="색상" visible={visible} setVisible={setVisible}>
		
		</AccordionComponent>
	)
}