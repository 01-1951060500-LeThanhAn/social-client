import React, { useEffect, useState } from "react";
import moment from "moment";
import useFakeUser from "../../hooks/useFakeUser";
import { getUser } from "../../api/users";
const Message = ({ item, userId, chatCurrent }) => {
  const { newUser } = useFakeUser();

  const [data, setData] = useState(null);

  useEffect(() => {
    const members = chatCurrent.members.find((id) => id !== userId);
    const getMessUser = async () => {
      const res = await getUser(members);

      setData(res.data);
    };

    getMessUser();
  }, [userId, chatCurrent]);

  return (
    <>
      <div
        className={
          newUser._id === item.sender
            ? ` flex flex-col items-end`
            : "flex flex-col"
        }
      >
        <div className="flex">
          <img
            className="w-12 h-12 object-cover rounded-full cursor-pointer"
            src={
              newUser._id === item.sender
                ? newUser?.profilePicture
                : data?.profilePicture
            }
            alt=""
          />

          <p
            className={`p-[10px] ml-2 rounded-xl w-auto ${
              newUser._id !== item.sender
                ? "bg-slate-300 text-black "
                : "bg-blue-600 text-white"
            }  max-w-md`}
          >
            {item.text}
          </p>
        </div>

        <div className="">
          <img
            className={
              item.img ? `w-64 h-48 object-cover ml-16 my-5` : `w-0 h-0`
            }
            src={item.img}
            alt=""
          />
        </div>

        <div className="text-sm text-slate-500 ml-14 mb-4">
          {moment(item.createdAt).fromNow()}
        </div>
      </div>
    </>
  );
};

export default Message;
