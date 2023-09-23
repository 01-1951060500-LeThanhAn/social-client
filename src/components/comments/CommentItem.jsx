import React, { useEffect, useState } from "react";

import { IoMdTrash } from "react-icons/io";
import { deleteCommentApi, getReplyCommentApi } from "../../api/comment";
import { toast } from "react-toastify";
import { AiOutlineLike } from "react-icons/ai";
import useFakeUser from "../../hooks/useFakeUser";
import { baseApi } from "../../api";
import moment from "moment";

const CommentItem = ({ item, deleteComment }) => {
  const { newUser } = useFakeUser();

  const [like, setLike] = useState(item.likesComment?.length);
  const [isLiked, setIsLiked] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const handleDeleteComment = async (id) => {
    if (window.confirm("You sure delete this comment")) {
      await deleteCommentApi(id);
      deleteComment(id);
      toast.success("Xóa comment thành công");
    }
  };

  const handleLikeComment = () => {
    try {
      baseApi.put("/api/comments/" + item._id + "/likecomment", {
        userId: newUser._id,
      });
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setIsLiked(item.likesComment.includes(newUser._id));
  }, [item.likesComment, newUser._id]);

  return (
    <>
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div className="flex justify-start relative">
            <div className="mt-2">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={
                  item?.userId?.profilePicture ||
                  `https://robohash.org/${item?.userId?.username}`
                }
                alt=""
              />
            </div>
            <div>
              <div className=" cursor-pointer ml-3 relative bg-slate-300  px-3 py-3 w-auto rounded-xl">
                <div className="flex items-center ">
                  <p className="font-semibold text-md">
                    {item.userId.username}
                  </p>
                  <p className="pl-2 text-slate-500">
                    {moment(item.createdAt).fromNow()}
                  </p>
                </div>
                <p>{item.comment}</p>
              </div>
            </div>

            <div
              onClick={handleLikeComment}
              className={`absolute ${
                isLiked ? "text-blue-600" : "text-slate-500"
              }  left-16 cursor-pointer font-semibold -bottom-6 text-sm `}
            >
              Thích
            </div>
            <div
              onClick={() => setShowReply(!showReply)}
              className="absolute left-28 cursor-pointer font-semibold -bottom-6 text-sm text-slate-500"
            >
              {showReply ? "Tiếp tục" : "Phản hồi"}
            </div>
            <div className="absolute -right-4 cursor-pointer font-semibold -bottom-4 text-sm text-slate-500">
              <div className="bg-slate-200 flex items-center px-2 py-1 rounded-xl">
                <div className="text-xl">
                  <AiOutlineLike />
                </div>
                <p className="text-md ml-2">{like}</p>
              </div>
            </div>
          </div>

          {newUser._id === item.userId._id ? (
            <>
              <div
                onClick={() => handleDeleteComment(item._id)}
                className="text-2xl cursor-pointer text-blue-600"
              >
                <IoMdTrash />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CommentItem;
