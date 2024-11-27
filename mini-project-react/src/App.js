import TestApi from "./components/testApi";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TestHome from "./pages/tetHome";
import TestLogin from "./pages/testLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<TestHome />} />
          <Route path="/loginpage" element={<TestLogin />} />
          <Route path="/api/test" element={<TestApi />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
