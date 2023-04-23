import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ data }) => {
  return (
    <>
      <div className=" mx-12 my-8">
        <div className="flex items-center">
          <div className="avatar">
            <Link to={`/profile/${data._id}`}>
              <img
                className="w-16 h-16 rounded-full object-cover"
                src={
                  data?.profilePicture ||
                  `https://robohash.org/${data?.username}`
                }
                alt=""
              />
            </Link>
          </div>
          <div className="ml-3">
            <p className="font-semibold">{data?.username}</p>
            <p className="text-slate-500">{data?.email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
