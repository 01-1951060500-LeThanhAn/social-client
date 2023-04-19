import { useRef } from "react";

import { toast } from "react-toastify";
import { registerUserApi } from "../../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { linkImages } from "../../api";
export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      toast.error("Password not same");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await registerUserApi(user);

        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${linkImages}/person/space.png)`,
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
            onSubmit={handleClick}
          >
            <input
              placeholder="Username"
              required
              ref={username}
              className="h-12 border-2 px-3 outline-none mt-4 border-slate-300"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="h-12 border-2 px-3 outline-none mt-4 border-slate-300"
              type="email"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="h-12 border-2 px-3 outline-none mt-4 border-slate-300"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="h-12 border-2 px-3 outline-none mt-4 border-slate-300"
              type="password"
            />
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
