import React from "react";
import { AiOutlineProfile } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { RiMessengerLine } from "react-icons/ri";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import useFakeUser from "../../hooks/useFakeUser";
import { Link } from "react-router-dom";
const TippyMenu = ({ children }) => {
  const { newUser } = useFakeUser();

  const handleLogOut = () => {
    if (window.confirm("You sure want to logout ?")) {
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
    }
    window.location.reload();
  };

  return (
    <Tippy
      interactive
      hideOnClick={false}
      delay={[0, 700]}
      offset={[12, 8]}
      placement="bottom-end"
      render={(attrs) => (
        <div
          className="bg-white shadow-xl text-black p-3 rounded-lg"
          tabIndex="-1"
          {...attrs}
        >
          <div className="">
            <Link to={`/messenger`}>
              <div className="flex items-center mb-2">
                <div className="logo text-xl">
                  <RiMessengerLine />
                </div>
                <div className="ml-2">Messenger</div>
              </div>
            </Link>
            <Link to={`/profile/${newUser._id}`}>
              <div className="flex items-center">
                <div className="logo text-xl">
                  <AiOutlineProfile />
                </div>
                <div className="ml-2">Profile</div>
              </div>
            </Link>
            <Link to={`/`}>
              <div onClick={handleLogOut} className="flex items-center mt-2">
                <div className="logo text-xl">
                  <IoLogOutOutline />
                </div>
                <div className="ml-2">LogOut</div>
              </div>
            </Link>
          </div>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default TippyMenu;
