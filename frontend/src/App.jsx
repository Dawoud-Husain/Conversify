import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Profile from "./pages/profile/Profile";
import ProfileEdit from "./pages/profile/edit/ProfileEdit";
import TwoFactorAuth from "./pages/login/TwoFactorAuth";
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
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <SignUp />}
        />
        <Route
          path="/twofactorauth/:userid"
          element={authUser ? <TwoFactorAuth></TwoFactorAuth> :<Login />}
        />

        <Route
          path="/profile/:userId"
          element={authUser ? <Profile /> : <Navigate to="/" />}
        />
        <Route
          path="/profile/edit/:userId"
          element={authUser ? <ProfileEdit /> : <Navigate to="/" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
