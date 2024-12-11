import TestApi from "./api/testApi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMain from "./pages/home/HomeMain";
import SearchMain from "./pages/search/SearchMain";
import CarInfoMain from "./pages/carInfo/CarInfoMain";
import SearchStore from "./context/SearchStore";
import UserStore from "./context/UserStore";
import Providers from "./Providers";
import Login from "./pages/authentication/Login";
import Join from "./pages/authentication/Join";
import FileUploadPage from "./pages/upload/FileUploadPage";

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
            <Route path="/api/test" element={<TestApi />} />
            <Route path="/search" element={<SearchMain />} />
            <Route path="/carInfo/:carNo" element={<CarInfoMain />} />
          </Routes>
        </Router>
      </Providers>
    </>
  );
}

export default App;
