import { AiFillLike } from "react-icons/ai";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { baseApi } from "../../api/index";

import { MdOutlineInsertComment } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import ModalEditPost from "../Modal/ModalEditPost";
import { savePost, sharePost } from "../../api/post";
import { toast } from "react-toastify";
import useFakeUser from "../../hooks/useFakeUser";
import { RiShareForwardLine } from "react-icons/ri";

import { BsFillTrashFill } from "react-icons/bs";
import moment from "moment";

function Post({ post }) {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [desc, setDesc] = useState(post?.desc);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { newUser } = useFakeUser();

  useEffect(() => {
    setIsLiked(post?.likes?.includes(newUser?._id));
  }, [newUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await baseApi.get(`/api/users?userId=${post.userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [post]);

  const likeHandler = (type) => {
    try {
      baseApi.put("/api/posts/" + post._id + "/like", {
        userId: newUser._id,
      });

      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSavePost = async (data) => {
    try {
      if (newUser?.favourite?.includes(post._id)) {
        return toast.warn("You saved this post before");
      }
      await savePost(data);
      toast.success("Saved post successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSharePost = async () => {
    try {
      await sharePost(post._id, newUser._id);

      toast.success("Shared this post successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm("You sure delete this post ? ")) {
      setLoading(true);

      try {
        const res = await baseApi.delete(`/api/posts/${post._id}`);

        return toast.success("Remove post successfully");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }

      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <div className="bg-white shadow-sm shadow-slate-500/50 w-[102%] md:w-full 2xl:w-full h-auto lg:h-[480px] mt-5">
          <div className="">
            <div className="flex justify-between items-center mx-3 mt-4">
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
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </div>

              <div className="postBottomRight">
                <span className="flex items-center text-lg mr-1">
                  <span
                    onClick={() =>
                      handleSavePost({
                        saveBy: newUser._id,
                        postId: post._id,
                      })
                    }
                    className="text-xl cursor-pointer mr-2"
                  >
                    <BsBookmark />{" "}
                  </span>

                  {newUser._id === post.userId && (
                    <span
                      onClick={handleDeletePost}
                      className="text-xl cursor-pointer "
                    >
                      <BsFillTrashFill />{" "}
                    </span>
                  )}
                </span>
              </div>
            </div>
            <div className="postCenter">
              <span className="ml-5">{post?.desc}</span>

              <Link to={`/details/${post?._id}/${post?.userId}`}>
                <img
                  className="w-full mt-4 lg:h-[300px] h-[270px] object-contain"
                  src={`${post?.img}`}
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
                <span className="flex justify-center items-center text-lg mr-1">
                  <span className="text-2xl cursor-pointer">
                    <MdOutlineInsertComment />{" "}
                  </span>
                  <span className="ml-2">{post.commentsCount}</span>
                </span>
              </div>
              <div className="postBottomRight">
                <span
                  onClick={handleSharePost}
                  className="flex items-center text-lg mr-1"
                >
                  <span className="text-2xl cursor-pointer">
                    <RiShareForwardLine />{" "}
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {show && (
        <ModalEditPost
          desc={desc}
          post={post}
          setDesc={setDesc}
          loading={loading}
          setLoading={setLoading}
          setShow={setShow}
        />
      )}
    </>
  );
}
export default Post;
