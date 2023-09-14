import React, { useEffect, useState } from "react";
import { BsFacebook, BsFillBellFill, BsSearch } from "react-icons/bs";
import { getUser } from "../../api/users.js";
import { Collapse } from "antd";
import { FaImages } from "react-icons/fa";
import { AiOutlineFileText } from "react-icons/ai";
import { FiLink } from "react-icons/fi";
import { Link } from "react-router-dom";
const { Panel } = Collapse;

const Chat = ({ userId, chatCurrent, listImages }) => {
  const [data, setData] = useState({});

  // console.log(chatCurrent);

  useEffect(() => {
    const members = chatCurrent.members.find((id) => id !== userId);
    const getMessUser = async () => {
      const res = await getUser(members);
      // console.log(res.data);
      setData(res.data);
    };

    getMessUser();
  }, [userId, chatCurrent]);

  return (
    <>
      <div className="chatOnline">
        <div className="flex items-center flex-col font-semibold cursor-pointer mt-3">
          <div className="relative mr-3">
            <Link to={`/profile/${data._id}`}>
              <img
                className="w-36 h-36 object-cover rounded-full"
                src={data?.profilePicture}
                alt=""
              />
            </Link>
          </div>
          <span className="text-center text-2xl mt-3">{data?.username}</span>
        </div>

        <div className="">
          <div className="flex items-center justify-center">
            <div className=" mx-auto mt-3">
              <div className="flex items-center justify-center text-2xl cursor-pointer">
                <BsFacebook />
              </div>
              <div className="title">Trang cá nhân</div>
            </div>
            <div className=" mx-auto mt-3">
              <div className="flex items-center justify-center text-2xl cursor-pointer">
                <BsFillBellFill />
              </div>
              <div className="title">Thông báo</div>
            </div>
            <div className=" mx-auto mt-3">
              <div className="flex items-center justify-center text-2xl cursor-pointer">
                <BsSearch />
              </div>
              <div className="title">Tìm kiếm</div>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Collapse ghost defaultActiveKey={["1"]}>
            <Panel className="text-lg" header="Danh sách" key="1">
              <div className="info_chat">
                <div className="flex items-center cursor-pointer ">
                  <div className=" mr-4">
                    <FaImages />
                  </div>
                  <p>File phương tiện</p>
                </div>
                <div className="flex items-center cursor-pointer  mt-3">
                  <div className=" mr-4">
                    <AiOutlineFileText />
                  </div>
                  <p>File </p>
                </div>
                <div className="flex items-center cursor-pointer  mt-3">
                  <div className=" mr-4">
                    <FiLink />
                  </div>
                  <p>Liên kết</p>
                </div>
              </div>
            </Panel>
          </Collapse>

          <Collapse ghost defaultActiveKey={["2"]}>
            <Panel className="text-lg" header="Hình ảnh và file" key="2">
              <div className="mx-4 max-h-[270px] overflow-y-scroll">
                <div className="grid lg:grid-cols-2 2xl:grid-cols-3 gap-y-2">
                  {listImages.map((image) => (
                    <div className="image">
                      <img
                        className="2xl:w-28 2xl:h-28 lg:w-24 lg:h-24 object-cover "
                        src={image?.img}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
      </div>
    </>
  );
};

export default Chat;
