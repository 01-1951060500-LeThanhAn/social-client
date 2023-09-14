import { AiFillLike } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { baseApi } from "../../api/index";
import { MdOutlineInsertComment } from "react-icons/md";
import { BsBookmark } from "react-icons/bs";
import ModalEditPost from "../Modal/ModalEditPost";
import { savePost, sharePost } from "../../api/post";
import { toast } from "react-toastify";
import useFakeUser from "../../hooks/useFakeUser";
import { RiShareForwardLine } from "react-icons/ri";
import moment from "moment";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteVideo } from "../../api/videos";
import ModalDetailVideo from "../Modal/ModalDetailVideo";
function Video({ post, videos, setVideos }) {
  const [like, setLike] = useState(post.likes?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [desc, setDesc] = useState(post?.desc);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [modalVideo, setModalVideo] = useState(false);
  const { newUser } = useFakeUser();
  const videoRef = useRef();
  const [stop, setStop] = useState(false);

  const handleVideo = () => {
    setStop(!stop);
    if (stop === true) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
  };

  useEffect(() => {
    setIsLiked(post?.likes?.includes(newUser?._id));
  }, [newUser._id, post.likes]);

  const likeHandler = () => {
    try {
      baseApi.put("/api/posts/" + post._id + "/like/video", {
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

  const handleDeleteVideo = async () => {
    if (window.confirm("You sure delete this post ? ")) {
      setLoading(true);

      try {
        await deleteVideo(post._id);

        setVideos(videos.filter((id) => id !== post._id));
        return toast.success("Remove video successfully");
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
        <div className="bg-white shadow-sm shadow-slate-500/50 w-[102%] md:w-full h-1/2 lg:h-[480px] mt-5">
          <div className="">
            <div className="flex justify-between items-center mx-4 mt-4">
              <div className="flex items-center mt-2 mb-3">
                <Link to={`/profile/${post.userId._id}`}>
                  <img
                    className="w-12 h-12 object-cover rounded-full"
                    src={
                      post?.userId.profilePicture
                        ? post?.userId.profilePicture
                        : `https://robohash.org/${user.username}`
                    }
                    alt=""
                  />
                </Link>
                <div className="ml-2 flex flex-col">
                  <span className=" font-bold">{post?.userId?.username}</span>
                  <span className="text-slate-400">
                    {moment(post.createdAt).fromNow()}
                  </span>
                </div>
              </div>
              {newUser._id === post?.userId._id && (
                <div className="postBottomRight">
                  <span className="flex items-center text-lg mr-1">
                    <span
                      onClick={() =>
                        handleSavePost({
                          saveBy: newUser._id,
                          postId: post?.userId._id,
                        })
                      }
                      className="text-xl cursor-pointer mr-2"
                    >
                      <BsBookmark />{" "}
                    </span>
                    <span
                      onClick={handleDeleteVideo}
                      className="text-xl cursor-pointer "
                    >
                      <BsFillTrashFill />{" "}
                    </span>
                  </span>
                </div>
              )}
            </div>
            <div className="postCenter">
              <span className="ml-5">{post?.desc}</span>

              <div onClick={() => setModalVideo(true)}>
                <div onClick={handleVideo}>
                  <video
                    ref={videoRef}
                    controls
                    className="w-full mt-4 lg:h-[300px] h-[300px] object-cover"
                  >
                    <source src={post?.videos} type="video/mp4"></source>
                  </video>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-5 mx-5 pb-8">
              <div className="flex items-center">
                <div
                  onClick={() => likeHandler(1)}
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

      {modalVideo && (
        <ModalDetailVideo
          post={post}
          videoRef={videoRef}
          setModalVideo={setModalVideo}
          handleVideo={handleVideo}
        />
      )}
    </>
  );
}
export default Video;
