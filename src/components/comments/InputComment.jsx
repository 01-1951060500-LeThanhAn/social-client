import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { CircularProgress } from "react-cssfx-loading";
import { toast } from "react-toastify";
import { postCommentApi } from "../../api/comment";
import useFakeUser from "../../hooks/useFakeUser";

const InputComment = ({ id, fetchComments, listComments, setListComments }) => {
  const [text, setText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const { newUser } = useFakeUser();

  const handlePostComment = async (e, newComment) => {
    e.preventDefault();
    if (!text.trim()) return toast.warn("Vui lòng không bỏ trống");
    setCommentLoading(true);
    try {
      const res = await postCommentApi(newComment);
      if (res.data.success) {
        setListComments([res.data.comment, ...listComments]);
        toast.success("Thêm comment thanh cong!");
      }
      setText("");
      fetchComments(id);
      setCommentLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Thêm comment thất bại!");
    }

    setCommentLoading(false);
  };
  return (
    <>
      <div className="comments mt-5  mb-8">
        <form
          action=""
          onSubmit={(e) =>
            handlePostComment(e, {
              postId: id,
              userId: newUser._id,
              comment: text,
            })
          }
        >
          <div className="flex items-center">
            <div className="avatar">
              <img
                className="w-12 h-12 object-cover rounded-full mr-2"
                src={
                  newUser.profilePicture ||
                  `https://robohash.org/${newUser?.username}`
                }
                alt=""
              />
            </div>
            <div className="flex justify-between items-center w-full ml-2 ">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                type="text"
                className="px-4 py-[10px] shadow-sm shadow-slate-500/50 w-full outline-none rounded-l-full"
                placeholder="Add comment"
              />
              <button
                type="submit"
                className="text-lg pr-4 shadow-sm shadow-slate-500/50 bg-white py-[13px] cursor-pointer rounded-r-full"
              >
                {commentLoading ? (
                  <CircularProgress
                    width={20}
                    height={20}
                    style={{ marginLeft: "5px" }}
                  />
                ) : (
                  <AiOutlineSend />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default InputComment;
