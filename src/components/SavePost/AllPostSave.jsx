import React, { useEffect, useState } from "react";
import { baseApi } from "../../api";

import { BsTrashFill } from "react-icons/bs";
import { MdOutlineInsertComment } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { Link } from "react-router-dom";
import moment from "moment";
import { getUser } from "../../api/users";
import useFakeUser from "../../hooks/useFakeUser";
import { deleteSavePost } from "../../api/post";
import { toast } from "react-toastify";
const AllPostSave = ({ post, setSavePosts, savePosts }) => {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const { newUser } = useFakeUser();
  const [like, setLike] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllSavePost = async () => {
      const res = await baseApi.get(`/api/posts/${post?.post._id}`);

      setData(res.data);
      setLike(res.data.likes.length);
    };

    getAllSavePost();
  }, [post]);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await getUser(data.userId);

      setUser(res.data);
    };

    getUserInfo();
  }, [data.userId]);

  useEffect(() => {
    setIsLiked(data?.likes?.includes(newUser?._id));
  }, [newUser._id, data.likes]);

  const likeHandler = () => {
    try {
      baseApi.put("/api/posts/" + post?.post._id + "/like", {
        userId: newUser._id,
      });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveSavePost = async () => {
    if (window.confirm("You sure delete this post saved ?")) {
      setLoading(true);
      try {
        await deleteSavePost(post?.post?._id);

        setSavePosts(savePosts.filter((id) => id !== post._id));
        return toast.success("Remove post successfully");
      } catch (error) {
        console.log(error);
        setLoading(false);
        toast.error("Remove failed");
      }
      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <div className="bg-white mb-6 shadow-sm shadow-slate-500/50 w-full lg:w-3/5 xl:w-1/3 2xl:w-1/2 h-auto mx-auto lg:h-[480px] mt-5">
          <div className="">
            <div className="flex justify-between items-center mx-4 mt-4">
              <div className="flex items-center mt-2 mb-3">
                <Link to={`/profile/${post.userId}`}>
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={
                      user.profilePicture
                        ? user.profilePicture
                        : `https://robohash.org/${user.username}`
                    }
                    alt=""
                  />
                </Link>
                <div className="ml-2 flex flex-col">
                  <span className=" font-bold">{user?.username}</span>
                  <span className="text-slate-400">
                    {moment(data.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              <div
                onClick={() => handleRemoveSavePost(post)}
                className="text-xl cursor-pointer"
              >
                <BsTrashFill />
              </div>
            </div>
            <div className="">
              <span className="ml-5">{data?.desc}</span>

              <Link to={`/details/${data._id}/${data.userId}`}>
                <img
                  className="w-full mt-4 lg:h-[300px]  object-cover"
                  src={data?.img}
                  alt=""
                />
              </Link>
            </div>
            <div className="flex justify-between items-center mt-5 mx-5 pb-8">
              <div className="flex items-center">
                <div
                  onClick={likeHandler}
                  className={` ${
                    isLiked ? "text-blue-600" : ""
                  } text-2xl cursor-pointer `}
                >
                  <AiFillLike />
                </div>

                <span className="ml-3 ">{like}</span>
              </div>

              <div className="postBottomRight">
                <span className="flex items-center text-lg mr-1">
                  <span className="text-2xl cursor-pointer">
                    <MdOutlineInsertComment />{" "}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllPostSave;
