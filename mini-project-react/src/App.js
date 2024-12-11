import TestApi from "./api/testApi";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeMain from "./pages/home/HomeMain";
import SearchMain from "./pages/search/SearchMain";
import CarInfoMain from "./pages/carInfo/CarInfoMain";
import Providers from "./Providers";
<<<<<<< HEAD
import Login from "./pages/authentication/Login";
import Join from "./pages/authentication/Join";
import FileUploadPage from "./pages/upload/FileUploadPage";
=======
import CustomizeMain from "./pages/customize/CustomizeMain";

>>>>>>> 89b7bcc790260833859b6025d710d27044d13d42

function App() {
  return (
    <>
      <Providers>
        <Router>
          <Routes>
<<<<<<< HEAD
            <Route path="/" element={<HomeMain />} />
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/uploadFile" element={<FileUploadPage />} />
            <Route path="/api/test" element={<TestApi />} />
            <Route path="/search" element={<SearchMain />} />
            <Route path="/carInfo/:carNo" element={<CarInfoMain />} />
=======
            <Route path="/" element={<HomeMain/>} />
            <Route path="/loginpage" element={<TestLogin/>} />
            <Route path="/api/test" element={<TestApi/>} />
            <Route path="/search" element={<SearchMain/>}/>
            <Route path="/carInfo/:carNo" element={<CarInfoMain/>}/>
            <Route path="/customize/:carNo" element={<CustomizeMain/>}/>
>>>>>>> 89b7bcc790260833859b6025d710d27044d13d42
          </Routes>
        </Router>
      </Providers>
    </>
  );
}

export default App;
