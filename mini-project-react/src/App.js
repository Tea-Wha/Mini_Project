import TestApi from "./api/testApi";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeMain from "./pages/home/HomeMain";
import TestLogin from "./pages/testLogin";
import SearchMain from "./pages/search/SearchMain";
import CarInfoMain from "./pages/carInfo/CarInfoMain";
import Providers from "./Providers";
import CustomizeMain from "./pages/customize/CustomizeMain";
import BrandMain from "./pages/brand/BrandMain";

function App() {
  return (
    <>
      <Providers>
        <Router>
          <Routes>
            <Route path="/" element={<HomeMain/>} />
            <Route path="/loginpage" element={<TestLogin/>} />
            <Route path="/api/test" element={<TestApi/>} />
            <Route path="/search" element={<SearchMain/>}/>
            <Route path="/carInfo/:carNo" element={<CarInfoMain/>}/>
            <Route path="/customize/:carNo" element={<CustomizeMain/>}/>
            <Route path="/brand/:brandCode" element={<BrandMain/>}/>
          </Routes>
        </Router>
      </Providers>
    </>
  );
}

export default App;
