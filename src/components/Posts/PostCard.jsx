import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
const PostCard = ({ data }) => {
  return (
    <>
      <div className="bg-white shadow-md shadow-slate-500/50 md:w-2/3 md:mx-auto lg:w-1/2 2xl:w-1/3 h-96 my-8 text-black mx-3">
        <Link to={`/details/${data?._id}/${data.userId?._id}`}>
          <div className="flex justify-between items-center">
            <div className="mx-3 pt-4 flex items-center">
              <div className="">
                <img
                  className="w-12 h-12 rounded-full object-cover"
                  src={data?.userId?.profilePicture}
                  alt=""
                />
              </div>
              <div className="text-black">
                <p
                  className="text-xl ml-3
                  "
                >
                  {data?.userId?.username}
                </p>
              </div>
            </div>

            <div className="text-slate-400 mr-3">
              <p>{moment(data?.createdAt).fromNow()}</p>
            </div>
          </div>
          <div className="">
            <div className="">
              <img
                className="w-full px-3 py-3 h-64 object-cover"
                src={data?.img}
                alt=""
              />
            </div>
            <div className="mx-3 my-2">
              <p>{data.desc}</p>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default PostCard;
