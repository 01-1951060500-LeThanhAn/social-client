import React from "react";

import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { baseApi } from "../../api/index.js";
import useFakeUser from "../../hooks/useFakeUser";
const UserItem = ({ item }) => {
  const { newUser } = useFakeUser();
  const [followed, setFollowed] = useState(
    newUser.followings?.includes(item?._id)
  );
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      if (followed) {
        await baseApi.put(`/api/users/${item._id}/unfollow`, {
          userId: newUser._id,
        });
        setLoading(false);
        toast.success("Unfollow successfully");
      } else {
        await baseApi.put(`/api/users/${item._id}/follow`, {
          userId: newUser._id,
        });
        setLoading(true);
        toast.success("Follow this user successfully");
      }
      setFollowed(!followed);
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center my-3">
        <Link to={`/profile/${item._id}`}>
          <div className="flex items-center">
            <div className="">
              <img
                className="h-12 w-12 object-cover rounded-full
              "
                src={
                  item.profilePicture
                    ? item.profilePicture
                    : `https://robohash.org/${item.username}`
                }
                alt=""
              />
            </div>
            <div className="ml-3">
              <p>{item.username}</p>
            </div>
          </div>
        </Link>

        <div
          onClick={handleClick}
          className={`text-sm font-semibold cursor-pointer px-3 py-2 ${
            loading ? "bg-orange-400" : "bg-blue-600"
          } text-white`}
        >
          {loading ? "UNFOLLOW" : "FOLLOW"}
        </div>
      </div>
    </>
  );
};

export default UserItem;
