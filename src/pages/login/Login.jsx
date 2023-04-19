import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "react-cssfx-loading";
import { baseApi } from "../../api/index";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await baseApi.post("/api/auth/login", {
        email,
        password,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
      toast.success("Login Success");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };

  return (
    <>
      <div className="abc w-full h-[100vh] bg-slate-200 flex justify-center items-center">
        <div className="w-full md:w-4/5 lg:w-1/2 2xl:w-1/4 mx-3  h-auto pb-6 shadow-xl shadow-slate-500">
          <div className="mt-6 flex flex-col  justify-center ">
            <div className="logo">
              <p className="text-center text-white pb-6 font-semibold text-3xl">
                Thanh An
              </p>
            </div>
            <form
              className="h-[300px] px-5 flex justify-between flex-col"
              onSubmit={handleClick}
            >
              <input
                placeholder="Email"
                type="email"
                required
                className="h-12 border-2 px-3 outline-none border-slate-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                placeholder="Password"
                type="password"
                required
                minLength="6"
                className="h-12 border-2 px-3 outline-none border-slate-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="h-12 bg-blue-600 mt-3 text-white"
                type="submit"
                disabled={isFetching}
              >
                {isFetching ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Log In"
                )}
              </button>
              <span className="text-white">
                Don't have account?
                <Link to={`/register`} className="text-blue-600">
                  Create Account
                </Link>
              </span>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
