import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./components/RegisterPage/registerPage";
import LoginPage from "./components/LoginPage/loginPage";
import UserListPage from "./components/UserList/userListPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/user-list" element={<UserListPage />} />
        </Routes>
      </Router>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default App;
