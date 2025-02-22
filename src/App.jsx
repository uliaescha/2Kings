import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./components/pages/main-page/MainPage";
import Registration from "./components/pages/auth/Registration";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
  );
}

export default App;
