import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import ProfileTest from "./pages/profile-test/ProfileTest";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Messages from "./components/messages/Messages";
import Profile from "./pages/profile/Profile";

function App() {
  const { authUser } = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/profiletest"
          element={authUser ? <ProfileTest /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
          <Route
          path="/profile"
          element={authUser ? < Profile/> : <Navigate to="/" />}
        />

      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
