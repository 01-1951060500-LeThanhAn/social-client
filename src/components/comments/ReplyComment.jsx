import React, { useState } from "react";
import { Input, Button } from "antd";
import useFakeUser from "../../hooks/useFakeUser";
import { replyCommentApi } from "../../api/comment";

const ReplyComment = ({ item, fetchComments, id }) => {
  const { newUser } = useFakeUser();
  const [replyText, setReplyText] = useState("");

  const handleRepComments = async (data) => {
    try {
      await replyCommentApi(item.postId, item._id, data);
      fetchComments(id);
      setReplyText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-3/5 flex items-center  mx-auto mb-6">
        <div className="">
          {
            <img
              src={newUser?.profilePicture}
              className="w-12 rounded-full  h-12 object-cover"
              alt=""
            />
          }
        </div>
        <div className=" relative ml-3">
          <Input
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="py-3 w-[300px]"
            placeholder="Rep comment..."
            type="text"
          />
          <Button
            onClick={() =>
              handleRepComments({
                userId: newUser._id,
                comment: replyText,
              })
            }
            className="bg-blue-500 font-semibold text-lg h-full rounded-md absolute right-0 top-0 text-white"
          >
            Send
          </Button>
        </div>
      </div>
    </>
  );
};

export default ReplyComment;
