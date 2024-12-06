import CarInfoStore from "./context/CarInfoStore";
import UserStore from "./context/UserStore";
import SearchStore from "./context/SearchStore";


const Providers = ({ children }) => {
	return (
		<UserStore>
			<SearchStore>
				<CarInfoStore>
					{children}
				</CarInfoStore>
			</SearchStore>
		</UserStore>
	);
};

export default Providers;