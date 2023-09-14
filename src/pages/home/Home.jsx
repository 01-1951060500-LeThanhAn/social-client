import React from "react";
import TopBar from "../../components/Topbar/TopBar";
import SideBar from "../../components/Sidebar/SideBar";

import RightBar from "../../components/Rightbar/RightBar";

import Feed from "../../components/feed/Feed";
import useFakeUser from "../../hooks/useFakeUser";

const Home = () => {
  const { newUser } = useFakeUser();

  return (
    <>
      <TopBar />
      <div className="mt-16">
        <div className="flex justify-between bg-[#f0f2f5]">
          <div className="lg:w-1/4 lg:block hidden">
            <SideBar />
          </div>
          <div className="lg:w-[48%] 2xl:ml-20 lg:ml-28 md:w-3/5 w-full">
            <Feed username={newUser ? newUser.username : null} />
          </div>
          <div className="lg:w-1/3 hidden md:block md:w-2/5">
            <RightBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
