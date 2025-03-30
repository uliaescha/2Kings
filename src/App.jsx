import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main-page/MainPage";
import Registration from "./pages/registration/Registration";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";
import GuestOnlyRoute from "./routes/GuestOnlyRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<GuestOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
