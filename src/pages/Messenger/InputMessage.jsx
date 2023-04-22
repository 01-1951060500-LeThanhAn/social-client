import React from "react";
import { toast } from "react-toastify";
import { AiOutlineSend } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiOutlineCamera } from "react-icons/ai";
const InputMessage = ({
  file,
  setFile,
  handleSubmit,
  newMessage,
  setNewMessage,
}) => {
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    const type = ["image/png", "image/jpeg", "image/gif"];

    if (!file) return;

    if (!type.includes(file.type)) {
      return toast.error("Chỉ chấp nhận file hình ảnh!");
    }

    if (file.size / 1000000 > 10) {
      return toast.error("File của bạn không được vượt quá 10mb!");
    }

    file.preview = URL.createObjectURL(file);
    setFile(file);
  };

  return (
    <>
      <div className="relative z-40 ">
        <form
          onSubmit={handleSubmit}
          className="absolute bottom-0  left-0 w-full"
        >
          {file ? (
            <div className="">
              <img
                className="h-32  object-contain  mb-12"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <AiOutlineCloseCircle
                className="text-2xl text-black absolute top-0"
                onClick={() => setFile(null)}
              />
            </div>
          ) : null}

          <div className="flex relative bg-slate-100 pb-10 -mt-8 justify-between  items-center">
            <div className="w-full ">
              <input
                className=" w-full px-2 py-2 border border-blue-600 rounded-full outline-none
              "
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Enter message"
              />
            </div>

            <input
              type="file"
              hidden
              id="mess"
              onChange={(e) => handleChangeFile(e)}
            />

            <span
              className="right-12  text-blue-600 text-xl cursor-pointer absolute
              "
            >
              <label htmlFor="mess">
                {" "}
                <AiOutlineCamera />
              </label>
            </span>
            <button
              type="submit"
              className="absolute right-4 text-xl text-blue-600"
            >
              <AiOutlineSend />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default InputMessage;
