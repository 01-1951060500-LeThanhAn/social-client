import { MdPermMedia } from "react-icons/md";
import { useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { baseApi } from "../../api/index";
import { toast } from "react-toastify";
import useFakeUser from "../../hooks/useFakeUser";
import { CircularProgress } from "react-cssfx-loading";
import axios from "axios";

function ModalShare({ setIsModalOpen }) {
  const { newUser } = useFakeUser();
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!file && !desc) {
      return toast.error("Vui lòng thêm ảnh và tiêu đề");
    }

    if (!desc) {
      return toast.error("Vui lòng  tiêu đề");
    }
    if (!file) {
      return toast.error("Vui lòng thêm ảnh ");
    }

    setLoading(true);

    try {
      const newPost = {
        userId: newUser._id,
        desc: desc.current.value,
      };

      const data = new FormData();
      data.append("file", file);

      data.append("upload_preset", "videos");
      data.append("cloud_name", "dkw090gsn");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dkw090gsn/image/upload`,
        data
      );

      const newImg = {
        ...newPost,
        img: res.data?.url,
      };

      await baseApi.post("/api/posts", newImg);

      setFile(null);
      return window.location.reload();
    } catch (err) {
      toast.error("Create post failed");
      setFile(null);
      console.log(err);
    }
    setLoading(false);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="text-center ">
          <p className="text-2xl font-bold">Create Post</p>
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

          <form className="text-center" onSubmit={submitHandler}>
            <div className="ml-3 mb-8">
              {file ? (
                <div className="shareImgContainer">
                  <img
                    className="h-64 object-contain w-full"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                  <AiOutlineCloseCircle
                    className="text-2xl mt-2"
                    onClick={() => setFile(null)}
                  />
                </div>
              ) : (
                <label className="flex mr-[10px]" htmlFor="upload">
                  <div className="w-full h-64 bg-slate-100 flex justify-center items-center">
                    <div className="flex flex-col items-center">
                      <MdPermMedia className="text-xl text-slate-500" />
                      <span className="border-none text-xl text-slate-500">
                        Add Images
                      </span>
                    </div>
                  </div>
                </label>
              )}

              <input
                type="file"
                id="upload"
                hidden
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
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

export default ModalShare;
