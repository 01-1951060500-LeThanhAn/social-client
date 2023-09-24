import React, { useState } from "react";
import { Link } from "react-router-dom";
import { baseApi } from "../../api";
import useFakeUser from "../../hooks/useFakeUser";
import { toast } from "react-toastify";

const InfoUserFollow = ({ item }) => {
  const { newUser } = useFakeUser();
  const [followed, setFollowed] = useState(
    newUser.following?.includes(item._id)
  );
  const [laoding, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      if (followed) {
        try {
          await baseApi.put(`/api/users/${item._id}/unfollow`, {
            userId: newUser._id,
          });
          setLoading(true);
          toast.success("Unfollow successfully");
        } catch (error) {
          console.log(error);
          toast.error("Unfollow failed");
        }
      } else {
        try {
          await baseApi.put(`/api/users/${item._id}/follow`, {
            userId: newUser._id,
          });
          setLoading(false);
          toast.success("Follow this user successfully");
        } catch (error) {
          console.log(error);
          toast.error(error);
        }
      }
      setFollowed(!followed);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="mx-4 flex justify-between items-center ">
        <div className="flex justify-center items-center">
          <div className="">
            <Link to={`/profile/${item._id}`}>
              <img
                className="bg-slate-200 w-12 h-12 rounded-full object-cover"
                src={
                  item.profilePicture || `https://robohash.org/${item.username}`
                }
                alt=""
              />
            </Link>
          </div>
          <div className="ml-4 font-semibold text-xl">{item.username}</div>
        </div>

        <div className="mr-6">
          <button
            onClick={handleClick}
            className={`text-lg ${
              !laoding ? "bg-orange-400" : "bg-blue-600"
            } text-white cursor-pointer px-3 py-1`}
          >
            {!laoding ? "Followed" : "Follow"}
          </button>
        </div>
      </div>
    </>
  );
};

export default InfoUserFollow;
