import CarInfoStore from "./context/CarInfoStore";
import UserStore from "./context/UserStore";
import SearchStore from "./context/SearchStore";
import BrandStore from "./context/BrandStore";


const Providers = ({ children }) => {
	return (
		<UserStore>
			<SearchStore>
				<CarInfoStore>
					<BrandStore>
						{children}
					</BrandStore>
				</CarInfoStore>
			</SearchStore>
		</UserStore>
	);
};

export default Providers;