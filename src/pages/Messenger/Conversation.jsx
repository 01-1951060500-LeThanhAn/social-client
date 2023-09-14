import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/users";

const Conversation = ({ item, userId, online, messages }) => {
  console.log(messages);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (item) {
      const friendId = item.members.find((m) => m !== userId);

      const getConversationUser = async () => {
        const res = await getUser(friendId);

        setUser(res.data);
      };

      getConversationUser();
    }
  }, [userId, item]);

  return (
    <>
      <div className="conversation p-[10px] mt-3 hover:bg-slate-200 rounded-full">
        <div className="flex items-center relative">
          <img
            className="w-12 h-12  object-cover rounded-full cursor-pointer"
            src={user.profilePicture}
            alt=""
          />

          <span className="ml-4">{user?.username}</span>
          {online ? (
            <div className="w-3 h-3 rounded-full bg-green-500 shadow-green-500 shadow-xl absolute bottom-0 left-9"></div>
          ) : (
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-red-500 shadow-xl absolute bottom-0 left-9"></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Conversation;
