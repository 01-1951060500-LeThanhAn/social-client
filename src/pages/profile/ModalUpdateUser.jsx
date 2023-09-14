import React, { useEffect, useState } from "react";
import Overlay from "../../components/Modal/OverlayModal";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import { AiOutlineUpload } from "react-icons/ai";
import { updatedProfile } from "../../api/users";

const ModalUpdateUser = ({ setShow, user }) => {
  const [picture, setPicture] = useState(user);
  const [data, setData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    return () => {
      picture && URL.revokeObjectURL(picture);
    };
  }, [picture]);

  const ImageHander = async (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "thanhan2001");
      data.append("cloud_name", "dkw090gsn");
      fetch("https://api.cloudinary.com/v1_1/dkw090gsn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPicture({ ...picture, profilePicture: data.url });
        })
        .catch((err) => {
          toast.error("Some Thing Wron1g");
          setShow(false);
        });
    } else {
      toast.error("Photo is invalid");
      setShow(false);
    }
  };

  const handleUpload = async (e) => {
    await updatedProfile(picture._id, {
      profilePicture: picture?.profilePicture,
      username: data?.username,
      email: data?.email,
    });

    setShow(false);
    toast.success("Upload avatar success");
  };

  return (
    <Overlay setShow={setShow}>
      <form className="relative" onSubmit={handleUpload}>
        <div
          onClick={() => setShow(false)}
          className="absolute top-2 cursor-pointer text-2xl right-2"
        >
          <AiOutlineClose />
        </div>
        <div className="bg-white w-[400px] 2xl:w-[600px] 2xl:py-8 h-128 flex flex-col items-center">
          <div className="flex flex-col 2xl:flex-row justify-center items-center w-full">
            <div className="w-1/2">
              <div className="avatar">
                <img
                  src={
                    user.profilePicture
                      ? picture.profilePicture
                      : `https://robohash.org/${user.username}`
                  }
                  alt=""
                  className="w-36 h-36 object-cover mx-auto mt-4 bg-white rounded-full"
                />
              </div>

              <div className="flex justify-center">
                <label htmlFor="file-bg">
                  <div className="mt-4 w-[30px]">
                    <span className="text-3xl cursor-pointer ">
                      <AiOutlineUpload />
                    </span>
                  </div>

                  <input
                    onChange={(e) => {
                      ImageHander(e.target.files[0]);
                    }}
                    type="file"
                    accept="image/*"
                    id="file-bg"
                    hidden
                    name="file"
                  />
                </label>
              </div>
            </div>

            <div className="w-4/5 2xl:w-1/2 2xl:mr-12 mb-8">
              <div className=" my-4">
                <label className="">UserName</label>
                <input
                  className="border-2 mt-2 border-slate-300 outline-none px-3 py-1 w-full"
                  type="text"
                  name="username"
                  onChange={handleChange}
                  value={data.username}
                  placeholder="Enter username"
                />
              </div>
              <div className="email">
                <label className="">Email</label>
                <input
                  className="border-2 mt-2 border-slate-300 outline-none px-3 py-1 w-full"
                  type="text"
                  name="email"
                  onChange={handleChange}
                  value={data.email}
                  placeholder="Enter email"
                />
              </div>
            </div>
          </div>
          <div className="mb-8 text-center">
            <button
              type="submit"
              className="w-auto bg-blue-600 mt-4 text-white py-1 px-3"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </Overlay>
  );
};
export default ModalUpdateUser;
