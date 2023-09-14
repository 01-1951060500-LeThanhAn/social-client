import { MdPermMedia } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { baseApi } from "../../api/index";

import useFakeUser from "../../hooks/useFakeUser";
import axios from "axios";
import { CircularProgress } from "react-cssfx-loading";

function ModalShareVideos({ setIsModalVideos }) {
  const { newUser } = useFakeUser();
  const [loading, setLoading] = useState(false);
  const desc = useRef();
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

  const videoPreviewRef = useRef(null);

  const handleChangeVideos = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!desc) {
      return toast.error("Vui lòng  tiêu đề");
    }

    if (!file.type.startsWith("video")) {
      return toast.error("Only accept video files");
    }

    if (file.size / 1000000 > 30) {
      return toast.error("File chọn không được hơn 30MB");
    }

    const preview = URL.createObjectURL(file);

    setVideoFile(file);
    setVideoPreview(preview);
  };

  const handleDiscard = () => {
    setVideoFile(null);
    setVideoPreview(null);
  };

  useEffect(() => {
    return () => {
      videoPreview && URL.revokeObjectURL(videoPreview);
    };
  }, [videoPreview]);

  const handleUploadVideo = async (e) => {
    e.preventDefault();

    if (!videoFile) {
      toast.error("Vui lòng chọn video");
    }

    setLoading(true);

    try {
      const newPost = {
        userId: newUser._id,
        desc: desc.current.value,
      };

      const data = new FormData();
      data.append("file", videoFile);

      data.append("upload_preset", "videos");
      data.append("cloud_name", "dkw090gsn");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dkw090gsn/video/upload`,
        data
      );

      const newVideo = {
        ...newPost,
        videos: res.data?.url,
      };

      await baseApi.post("/api/posts/video", newVideo);
      setVideoFile(null);
      window.location.reload();
    } catch (error) {
      toast.error("upload video lỗi");
      console.log(error);
    }
    setLoading(false);
    setIsModalVideos(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="text-center ">
          <p className="text-2xl font-bold">Create Videos</p>
        </div>
        <div className="">
          <div className="flex items-center">
            <img
              className="w-12 h-12 object-cover rounded-full mr-3"
              src={
                newUser.profilePicture
                  ? newUser.profilePicture
                  : `https://robohash.org/${newUser.username}`
              }
              alt=""
            />

            <p className="font-semibold text-lg mt-2">{newUser.username}</p>
          </div>
          <div className="mt-3 mr-5 md:mr-0">
            <input
              placeholder={"What's in your mind " + newUser.username + "?"}
              className="outline-none rounded-full bg-slate-100 px-2 ml-3 py-2 md:w-[450px] w-full mr-[40px]"
              ref={desc}
            />
          </div>
          <hr className="m-[20px]" />

          <form className="text-center" onSubmit={handleUploadVideo}>
            <div className="ml-3 mb-8">
              {videoPreview ? (
                <div className="shareImgContainer">
                  <video
                    muted
                    ref={videoPreviewRef}
                    className="h-[250px] w-full"
                    src={videoPreview}
                    controls
                    autoPlay
                  />
                </div>
              ) : (
                <label className="flex mr-[10px]" htmlFor="video">
                  <div className="w-full h-64 bg-slate-100 flex justify-center items-center">
                    <div className="flex flex-col items-center">
                      <MdPermMedia className="text-xl text-slate-500" />
                      <span className="border-none text-xl text-slate-500">
                        Add Videos
                      </span>
                    </div>
                  </div>
                </label>
              )}

              <AiOutlineCloseCircle
                className="text-2xl mt-2"
                onClick={handleDiscard}
              />

              <input
                type="file"
                id="video"
                hidden
                name="video"
                accept=".mp4"
                onChange={handleChangeVideos}
              />
            </div>
            <button
              className="bg-blue-600 text-white py-2  w-full mr-8"
              type="submit"
            >
              <p className="font-semibold text-xl">
                {loading ? (
                  <div className="flex justify-center items-center ">
                    <CircularProgress color="white" duration="2s" />
                  </div>
                ) : (
                  "Post"
                )}
              </p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalShareVideos;
