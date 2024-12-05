import TestApi from "./api/testApi";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeMain from "./pages/home/HomeMain";
import TestLogin from "./pages/testLogin";
import SearchMain from "./pages/search/SearchMain";
import CarInfoMain from "./pages/carInfo/CarInfoMain";
import SearchStore from "./context/SearchStore";
import UserStore from "./context/UserStore";


function App() {
  return (
    <>
      <UserStore>
        <SearchStore>
          <Router>
            <Routes>
              <Route path="/" element={<HomeMain />} />
              <Route path="/loginpage" element={<TestLogin />} />
              <Route path="/api/test" element={<TestApi />} />
              <Route path="/search" element={<SearchMain/>}/>
              <Route path="/carInfo/:carNo" element={<CarInfoMain/>}/>
            </Routes>
          </Router>
        </SearchStore>
      </UserStore>
    </>
  );
}

export default App;
