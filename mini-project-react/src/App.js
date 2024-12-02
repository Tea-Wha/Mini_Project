import TestApi from "./api/testApi";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomeMain from "./pages/home/HomeMain";
import TestLogin from "./pages/testLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeMain />} />
          <Route path="/loginpage" element={<TestLogin />} />
          <Route path="/api/test" element={<TestApi />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
