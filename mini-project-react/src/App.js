import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMain from "./pages/home/HomeMain";
import SearchMain from "./pages/search/SearchMain";
import CarInfoMain from "./pages/carInfo/CarInfoMain";
import Providers from "./Providers";
import Login from "./pages/authentication/Login";
import Join from "./pages/authentication/Join";
import FileUploadPage from "./pages/upload/FileUploadPage";
import CustomizeMain from "./pages/customize/CustomizeMain";
import BrandMain from "./pages/brand/BrandMain";
import CartMain from "./pages/cart/CartMain";
import FindId from "./pages/authentication/FindId";

function App() {
  return (
    <>
      <Providers>
        <Router>
          <Routes>
            <Route path="/" element={<HomeMain />} />
            <Route path="/login" element={<Login />} />
            <Route path="/findId" element={<FindId />} />
            <Route path="/join" element={<Join />} />
            <Route path="/uploadFile" element={<FileUploadPage />} />
            <Route path="/search" element={<SearchMain />} />
            <Route path="/brand/:brand" element={<BrandMain />} />
            <Route path="/search" element={<SearchMain />} />
            <Route path="/carInfo/:carNo" element={<CarInfoMain />} />
            <Route path="/customize/:carNo/:update" element={<CustomizeMain />} />
            <Route path="/cart" element={<CartMain />} />
          </Routes>
        </Router>
      </Providers>
    </>
  );
}

export default App;
