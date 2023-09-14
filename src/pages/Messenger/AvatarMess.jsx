import React, { useState } from "react";
import { useEffect } from "react";
import useInnerWidth from "../../hooks/useInnerWidth";
import { getUser } from "../../api/users.js";
import { AiFillInfoCircle } from "react-icons/ai";
import { BsFillTelephoneFill, BsFillCameraVideoFill } from "react-icons/bs";
const AvatarMess = ({ chatCurrent, userId }) => {
  const [data, setData] = useState(null);
  const windowSize = useInnerWidth();
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
      {windowSize.width > 700 && (
        <div className=" px-2 pb-3 flex justify-between items-center ">
          <div className=" py-3 flex items-center text-lg">
            <img
              src={data?.profilePicture}
              className="w-12 h-12 rounded-full object-cover"
              alt=""
            />

            <p className="ml-3">{data?.username}</p>
          </div>

          <div className="flex items-center">
            <div className="text-2xl cursor-pointer mx-2 text-blue-600">
              <BsFillTelephoneFill />
            </div>
            <div className="text-2xl cursor-pointer mx-2 text-blue-600">
              <BsFillCameraVideoFill />
            </div>
            <div className="text-2xl cursor-pointer mx-2 text-blue-600">
              <AiFillInfoCircle />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AvatarMess;
