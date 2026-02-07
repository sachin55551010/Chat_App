import "./App.css";
import { NavBar } from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProfilePage } from "./pages/ProfilePage";
import { useCheckAuthUserQuery } from "./redux/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { setAuthUser } from "./redux/authSlice";
import { CgSpinner } from "react-icons/cg";
import { ChatContainer } from "./components/ChatContainer";

function App() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const { data, isLoading } = useCheckAuthUserQuery();
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (data) {
        dispatch(setAuthUser(data));
      }
      setIsCheckingAuth(false);
    }
  }, [data, isLoading, dispatch]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="h-screen flex justify-center items-center">
        <CgSpinner className="size-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="w-screen">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authUser ? <ProfilePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat/:id"
          element={authUser ? <ChatContainer /> : <Navigate to="/login" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
