import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMain from "./pages/home/HomeMain";
import SearchMain from "./pages/search/SearchMain";
import CarInfoMain from "./pages/carInfo/CarInfoMain";
import Providers from "./Providers";
import Login from "./pages/authentication/Login";
import Join from "./pages/authentication/Join";
import FileUploadPage from "./pages/upload/FileUploadPage";
import CustomizeMain from "./pages/customize/CustomizeMain";

function App() {
  return (
    <>
      <Providers>
        <Router>
          <Routes>
            <Route path="/" element={<HomeMain />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/uploadFile" element={<FileUploadPage />} />
            <Route path="/search" element={<SearchMain />} />
            <Route path="/carInfo/:carNo" element={<CarInfoMain />} />
            <Route path="/" element={<HomeMain />} />
            <Route path="/search" element={<SearchMain />} />
            <Route path="/carInfo/:carNo" element={<CarInfoMain />} />
            <Route path="/customize/:carNo" element={<CustomizeMain />} />
          </Routes>
        </Router>
      </Providers>
    </>
  );
}

export default App;
