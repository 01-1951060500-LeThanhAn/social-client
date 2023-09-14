import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/AuthContext";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import PostDetail from "./components/details/PostDetail";
import { ToastContainer, toast } from "react-toastify";
import Messenger from "./pages/Messenger/Messenger";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import VideoDetails from "./components/details/VideoDetails";
import SearchResults from "./components/Search/SearchResults";
import { useJwt } from "react-jwt";
function App() {
  const navigate = useNavigate();
  const { isExpired } = useJwt(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = () => {
      if (isExpired === true) {
        localStorage.removeItem("tokenAdmmin");
        localStorage.removeItem("admin");
        navigate("/login");
        toast.error("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại");
      }
    };

    checkToken();
  }, [isExpired]);

  return (
    <>
      <ToastContainer />
      <SkeletonTheme
        baseColor="rgb(224, 186, 186)"
        highlightColor="rgba(0,0,0,0.1)"
      >
        <div className="App bg-slate-100 h-screen">
          <AuthContextProvider>
            <Routes>
              <Route exact path="/" element={<Home />}></Route>

              <Route exact path="/login" element={<Login />}></Route>

              <Route
                path="/details/:id/:userId"
                element={<PostDetail />}
              ></Route>
              <Route
                path="/video/:id/:userId"
                element={<VideoDetails />}
              ></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route path="*" element={<NotFound />}></Route>
              <Route path="/search" element={<SearchResults />}></Route>
              <Route path="/messenger" element={<Messenger />}></Route>
              <Route path="/profile/:_id" element={<Profile />}></Route>
            </Routes>
          </AuthContextProvider>
        </div>
      </SkeletonTheme>
    </>
  );
}

export default App;
