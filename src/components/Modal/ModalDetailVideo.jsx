import React, { useEffect, useState } from "react";
import Overlay from "./OverlayModal";
import { getDetailVideo, likeVideos } from "../../api/videos";
// import { format } from "timeago.js";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { getCommentApi } from "../../api/comment";
import InputComment from "../comments/InputComment";
import CommentItem from "../comments/CommentItem";
import { AiOutlineClose } from "react-icons/ai";
import useFakeUser from "../../hooks/useFakeUser";
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

const ModalDetailVideo = ({ setModalVideo, post, handleVideo, videoRef }) => {
  const [details, setDetails] = useState({});
  const { newUser } = useFakeUser();
  const [listComments, setListComments] = useState(initPost);
  const [user, setUser] = useState(post?.userId);
  const [likeVideo, setLikeVideo] = useState(post?.likes.length);
  const [isLikedVideo, setIsLikedVideo] = useState(false);
  useEffect(() => {
    setIsLikedVideo(post?.likes?.includes(newUser?._id));
  }, [newUser._id, post.likes]);

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
    fetchComments(post._id);
  }, [post._id]);

  const deleteComment = (id) => {
    const newListComment = listComments.filter((p) => p._id !== id);
    setListComments(newListComment);
  };

  const fetchDetailsPosts = async (postId) => {
    const res = await getDetailVideo(postId);
    setDetails(res.data);
  };
  useEffect(() => {
    fetchDetailsPosts(post._id);
  }, [post._id]);

  const handleLikeVideo = async () => {
    try {
      await likeVideos(post._id, newUser._id);
      setLikeVideo(isLikedVideo ? likeVideo - 1 : likeVideo + 1);
      setIsLikedVideo(!isLikedVideo);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Overlay setShow={setModalVideo}>
        <div className="bg-white w-full mx-4 h-[90%] lg:h-3/5 lg:w-[80%] 2xl:w-3/5 2xl:h-4/5 relative">
          <div
            onClick={() => setModalVideo(false)}
            className="absolute text-xl z-50 cursor-pointer top-3 right-3"
          >
            <AiOutlineClose />
          </div>
          <div className="flex flex-col lg:flex-row 2xl:flex-row justify-center">
            <div className="2xl:w-1/2 lg:w-1/2 w-full ">
              <div onClick={handleVideo}>
                <video
                  ref={videoRef}
                  controls
                  className="w-full h-[300px] mt-4 2xl:h-[570px] object-contain"
                >
                  <source src={post?.videos} type="video/mp4"></source>
                </video>
              </div>
            </div>

            <div className="2xl:w-1/2 lg:w-1/2 w-full my-3 mx-4">
              <div className="flex mt-3 justify-between items-center">
                <div className="flex items-center">
                  <div className="vatar">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={details?.userId?.profilePicture}
                      alt=""
                    />
                  </div>
                  <div className="text-2xl ml-2 font-semibold">
                    <p>{details?.userId?.username}</p>
                  </div>
                </div>

                <div className="text-slate-500 mr-8">
                  {/* <p>{format(details?.createdAt)}</p> */}
                </div>
              </div>

              <div className="mt-3 ">
                <p>{details?.desc}</p>
              </div>

              <div className="mt-5">
                <div className="flex justify-between mx-32 items-center">
                  <div>
                    <div
                      onClick={handleLikeVideo}
                      className={` ${
                        isLikedVideo ? "text-blue-600" : ""
                      } text-2xl cursor-pointer `}
                    >
                      <AiFillLike />
                    </div>

                    <span className="ml-3 ">{likeVideo}</span>
                  </div>
                  <div>
                    <div className={` text-2xl cursor-pointer `}>
                      <MdOutlineInsertComment />{" "}
                    </div>

                    <span className="ml-3 ">0</span>
                  </div>
                </div>
              </div>

              <div className="w-[93%] lg:w-full">
                <InputComment
                  listComments={listComments}
                  setListComments={setListComments}
                  id={post._id}
                  fetchComments={fetchComments}
                />
              </div>
              <div className=" -mt-4 h-[110px] 2xl:h-[280px] md:h-[300px] -z-40 overflow-y-scroll">
                {listComments.length > 0 ? (
                  listComments.map((item, index) => (
                    <div className="mr-16">
                      <CommentItem
                        item={item}
                        user={user}
                        userId={post?.userId?._id}
                        setUser={setUser}
                        deleteComment={deleteComment}
                        key={index}
                      />
                    </div>
                  ))
                ) : (
                  <div className="mb-8 flex items-center justify-center">
                    <h1>Không có nhận xét nào gần đây!</h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Overlay>
    </>
  );
};

export default ModalDetailVideo;
