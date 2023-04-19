import { MdPermMedia } from "react-icons/md";
import { useContext, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { baseApi } from "../../api/index";
import { toast } from "react-toastify";
import useFakeUser from "../../hooks/useFakeUser";
import { AuthContext } from "../../context/AuthContext";
import { addPost } from "../../context/AuthAction";

function ModalShare({ setIsModalOpen }) {
  const { newUser } = useFakeUser();
  const { dispatch } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!file || !desc) {
      return toast.error("Vui lòng thêm ảnh và tiêu đề");
    }

    try {
      const newPost = {
        userId: newUser._id,
        desc: desc.current.value,
      };

      const data = new FormData();
      const fileName = Date.now() + file?.name;

      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;

      await baseApi.post("/api/upload", data);
      dispatch(addPost(newPost));
      setFile(null);
      window.location.reload();
      toast.success("Create post successfully");
    } catch (err) {
      setFile(null);

      console.log(err);
    }

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
          <div className="mt-3">
            <input
              placeholder={"What's in your mind " + newUser.username + "?"}
              className="outline-none bg-slate-100 px-2 ml-3 py-2 w-[450px] mr-[40px]"
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
              <p className="font-semibold text-xl">Post</p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ModalShare;
