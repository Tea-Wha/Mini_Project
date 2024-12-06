import CarInfoStore from "./context/CarInfoStore";


const Providers = ({ children }) => {
	return (
		<CarInfoStore>
			{children}
		</CarInfoStore>
	);
};