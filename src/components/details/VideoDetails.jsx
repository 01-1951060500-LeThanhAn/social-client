import React, { useContext, useRef } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { baseApi } from "../../api";
import { useState } from "react";

import { AiOutlineLike, AiOutlineEdit } from "react-icons/ai";
import TopBar from "../Topbar/TopBar";
import SideBar from "../Sidebar/SideBar";
import RightBar from "../Rightbar/RightBar";
import InputComment from "../comments/InputComment";
import { getCommentApi } from "../../api/comment";
import CommentItem from "../comments/CommentItem";
import { AuthContext } from "../../context/AuthContext";
import { editPost } from "../../api/post";
import { getDetailVideo } from "../../api/videos";
import { toast } from "react-toastify";
import moment from "moment";
const initPost = {
  comments: [],
  userId: "",
  content: "",
  createdAt: "",
  videos: "",
  likes: [""],

  updatedAt: "",
  __v: 0,
  _id: "",
};

const VideoDetails = () => {
  const { id, userId } = useParams();
  const [details, setDetails] = useState({});
  const [desc, setDesc] = useState("");
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [listComments, setListComments] = useState(initPost);
  const { user: currentUser } = useContext(AuthContext);
  const videoRef = useRef();
  const [stop, setStop] = useState(false);

  const handleVideo = () => {
    setStop(!stop);
    if (stop === true) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const fetchDetailsPosts = async (postId) => {
    const res = await getDetailVideo(postId);

    setDetails(res.data);
    setDesc(res.data.desc);
  };
  useEffect(() => {
    fetchDetailsPosts(id);
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await baseApi.get(`/api/users?userId=${userId}`);

      setUser(res.data);
    };
    fetchUser();
  }, [userId]);

  const fetchComments = async (commentId) => {
    try {
      const res = await getCommentApi(commentId);

      if (res.data.success) {
        setListComments(res.data.comments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments(id);
  }, [id]);

  const handleEditPost = async (e) => {
    e.preventDefault();

    setEdit(true);

    try {
      const res = await editPost(id, desc);

      fetchDetailsPosts(id);
      toast.success("Updated successfully");
    } catch (error) {
      setEdit(false);
      console.log(error);
    }

    setEdit(false);
  };

  const deleteComment = (id) => {
    const newListComment = listComments.filter((p) => p._id !== id);
    setListComments(newListComment);
  };

  return (
    <>
      <TopBar />

      <div className="xl:flex lg:flex md:flex">
        <dic className="2xl:w-1/4 hidden 2xl:block">
          <SideBar />
        </dic>
        <div className=" 2xl:w-[40%] md:ml-6 lg:ml-10 2xl:ml-12 mx-6 lg:w-3/5 md:w-[55%]">
          <div className="w-full  py-2 mx-auto bg-white shadow-sm shadow-slate-400  mt-5">
            <div className="pb-6">
              <div className="flex justify-between items-center mx-4 mt-4">
                <div className="flex items-center mb-4">
                  <Link to={`/profile/${user._id}`}>
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={
                        user.profilePicture
                          ? user.profilePicture
                          : `https://robohash.org/${user.username}`
                      }
                      alt=""
                    />
                  </Link>

                  <div className="ml-2 flex flex-col">
                    <span className=" font-bold">{user.username}</span>
                    <span className="text-slate-400">
                      {moment(details.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
                {currentUser?.user._id === userId ? (
                  <div className="flex items-center">
                    <div
                      onClick={() => setEdit(true)}
                      className=" text-2xl cursor-pointer mr-3"
                    >
                      <AiOutlineEdit />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="">
                <form action="" onSubmit={handleEditPost}>
                  {edit ? (
                    <input
                      value={desc}
                      name="desc"
                      onChange={(e) => setDesc(e.target.value)}
                      className="bg-slate-200 pl-2 outline-none ml-6 py-1"
                      type="text"
                      autoFocus
                    />
                  ) : (
                    <span className="ml-5">{details?.desc}</span>
                  )}

                  {edit ? (
                    <button
                      className="bg-teal-600 text-white ml-3 px-3 py-[3px] text-lg"
                      type="submit"
                    >
                      Update
                    </button>
                  ) : (
                    ""
                  )}
                </form>

                <div>
                  <div
                    className="w-full mt-4 h-[350px] object-cover"
                    onClick={handleVideo}
                  >
                    <video
                      ref={videoRef}
                      autoPlay
                      controls
                      className="w-full mt-4 lg:h-[300px] object-cover"
                    >
                      <source src={details?.videos} type="video/mp4"></source>
                    </video>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-5 mx-5">
                <div className="flex items-center">
                  <div
                    //   onClick={likeHandler}
                    className={` text-2xl cursor-pointer `}
                  >
                    <AiOutlineLike />
                  </div>

                  <span className="ml-3 ">{details.likes?.length}</span>
                </div>
              </div>
            </div>
          </div>

          <InputComment
            listComments={listComments}
            setListComments={setListComments}
            id={id}
            fetchComments={fetchComments}
          />
          {listComments.length > 0 ? (
            listComments.map((item, index) => (
              <CommentItem
                item={item}
                user={user}
                userId={userId}
                setUser={setUser}
                deleteComment={deleteComment}
                key={index}
              />
            ))
          ) : (
            <div className="mb-8 flex items-center justify-center">
              <h1>Không có nhận xét nào gần đây!</h1>
            </div>
          )}
        </div>

        <div className="2xl:w-[30%] hidden md:block md:w-1/2 2xl:right-1 fixed -right-20 lg:w-2/5 ">
          <RightBar />
        </div>
      </div>
    </>
  );
};

export default VideoDetails;
