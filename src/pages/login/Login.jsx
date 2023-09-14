import { useContext, useState } from "react";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "react-cssfx-loading";
import { loginUserApi } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Login() {
  const { dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (value) => {
      setLoading(true);

      try {
        const res = await loginUserApi(value);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        navigate("/");
        toast.success("Login Success");
      } catch (error) {
        toast.error(error.response.data.message);
      }

      setLoading(false);
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Trường này là bắt buộc!")
        .matches(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          "Email không đúng định dạng!"
        ),
      password: Yup.string()
        .max(10, "Mật khẩu không đc vượt quá 10 kí tự!")
        .required("Trường này là bắt buộc!")
        .min(6, "Mật khẩu có ít nhất 6 kí tự!"),
    }),
  });

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
              onSubmit={formik.handleSubmit}
            >
              <input
                placeholder="Email"
                name="email"
                className="h-12 border-2 px-3 outline-none border-slate-300"
                value={formik.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email && (
                <p className="text-xs text-red-500 ">{formik.errors.email}</p>
              )}
              <input
                placeholder="Password"
                type="password"
                name="password"
                className="h-12 border-2 px-3 outline-none border-slate-300"
                value={formik.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password && (
                <p className="text-xs text-red-500 ">
                  {formik.errors.password}
                </p>
              )}
              <button
                className="h-12 bg-blue-600 mt-3 text-white"
                type="submit"
              >
                {loading ? (
                  <div className="flex justify-center items-center">
                    <CircularProgress color="white" size="12px" />
                  </div>
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
