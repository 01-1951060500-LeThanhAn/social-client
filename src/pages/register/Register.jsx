import { toast } from "react-toastify";
import { registerUserApi } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      comfirm_password: "",
    },
    onSubmit: async (value) => {
      try {
        const res = await registerUserApi(value);
        console.log(res.data);
        navigate("/login");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Trường này là bắt buộc!")
        .min(6, "Tên phải có ít nhất 6 kí tự!")
        .max(20, "Tên không đc vượt quá 20 kí tự!"),
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
      comfirm_password: Yup.string()
        .required("Trường này là bắt buộc!")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp!"),
    }),
  });

  return (
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-vector/cartoon-galaxy-background_23-2148975152.jpg?w=1060&t=st=1683207587~exp=1683208187~hmac=15e5aa09e3b54eb01392b7768ee810533c650439f3d685d036d1224775f6e13f")`,
        backgroundSize: "cover",
      }}
      className="w-full h-[100vh] bg-slate-200 flex justify-center items-center"
    >
      <div className="w-full mx-2 md:w-4/5 lg:w-1/2 2xl:w-1/4 h-auto pb-6 bg-white shadow-md shadow-slate-500/50">
        <div className="logo">
          <p className="text-center pb-3 mt-3 font-semibold text-3xl">
            Thanh An
          </p>
        </div>
        <div className="flex flex-col justify-center">
          <form
            className="h-auto px-5 flex justify-between flex-col"
            onSubmit={formik.handleSubmit}
          >
            <input
              onChange={formik.handleChange}
              value={formik.username}
              name="username"
              required
              placeholder="Username"
              className="h-12 border-2 px-3 outline-none mt-4 border-slate-300"
            />
            {formik.errors.username && (
              <p className="text-xs text-red-500 mt-2">
                {formik.errors.username}
              </p>
            )}
            <input
              onChange={formik.handleChange}
              value={formik.email}
              name="email"
              placeholder="EX: an@gmail.com"
              className="h-12 border-2 px-3 outline-none mt-4 border-slate-300"
            />
            {formik.errors.email && (
              <p className="text-xs text-red-500 mt-2">{formik.errors.email}</p>
            )}
            <input
              onChange={formik.handleChange}
              value={formik.password}
              name="password"
              placeholder="Password"
              required
              className="h-12 border-2 px-3 outline-none mt-4 border-slate-300"
              type="password"
            />
            {formik.errors.password && (
              <p className="text-xs text-red-500 mt-2">
                {formik.errors.password}
              </p>
            )}
            <input
              onChange={formik.handleChange}
              value={formik.comfirm_password}
              name="comfirm_password"
              placeholder="Password Again"
              required
              className="h-12 border-2 px-3 outline-none mt-4 border-slate-300"
              type="password"
            />
            {formik.errors.comfirm_password && (
              <p className="text-xs text-red-500 mt-2">
                {formik.errors.comfirm_password}
              </p>
            )}
            <button className="h-12 bg-blue-600 mt-3 text-white" type="submit">
              Sign Up
            </button>
            <p className="mt-3">
              If u have an account,{" "}
              <Link className="text-blue-600" to={`/login`}>
                let's login
              </Link>{" "}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
