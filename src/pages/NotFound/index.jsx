import React from "react";
import { linkImages } from "../../api";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div
        className="w-full h-screen bg-slate-200 flex justify-center items-center"
        style={{
          background: `url(${linkImages}/person/not.png)`,
        }}
      >
        <div className="">
          <p className="text-white text-[80px] font-semibold"> Not Found</p>
          <div className="text-center">
            <Link to={`/`}>
              <button
                className="border-2 cursor-pointer border-white text-white text-2xl px-4 py-2
              "
              >
                Go Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
