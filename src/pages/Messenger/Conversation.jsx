import React, { useState } from "react";
import { useEffect } from "react";
import { getUser } from "../../api/users";
import moment from "moment/moment";

const Conversation = ({ item, userId, online, messages }) => {
  const [user, setUser] = useState({});
  const [guest, setGuest] = useState("");
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

  useEffect(() => {
    const getConversationUserGuest = async () => {
      const res = await getUser(messages[messages.length - 1]?.sender);

      setGuest(res.data?.username);
    };

    getConversationUserGuest();
  }, [messages]);

  return (
    <>
      <div className="conversation p-[10px] mt-3 hover:bg-slate-200 rounded-full">
        <div className="flex items-center relative">
          <img
            className="w-12 h-12  object-cover rounded-full cursor-pointer"
            src={user.profilePicture}
            alt=""
          />

          <div className="">
            <span className="ml-4 font-semibold">{user?.username}</span>
            <div className="flex items-center justify-center ml-4">
              <p>{guest === user?.username ? guest : "Bạn"}: </p>
              <p className="ml-2 text-slate-500">
                {messages[messages.length - 1]?.text.length > 8 ? (
                  <>{messages[messages.length - 1]?.text.slice(0, 5)}...</>
                ) : (
                  messages[messages.length - 1]?.text
                )}
              </p>
              <p className="ml-2 text-slate-500">
                {moment(messages[messages.length - 1]?.createdAt).fromNow()}
              </p>
            </div>
          </div>
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
