import { BsFillCameraVideoFill, BsFillImageFill } from "react-icons/bs";
import { useState } from "react";

import { Button, Modal } from "antd";
import ModalShare from "./ModalShare";
import useFakeUser from "../../hooks/useFakeUser";
import ModalShareVideos from "./ModalShareVideos";

export default function Share({ loading, setLoading }) {
  const { newUser } = useFakeUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVideos, setIsModalVideos] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelVideos = () => {
    setIsModalVideos(false);
  };
  const showModalVideos = () => {
    setIsModalVideos(true);
  };

  return (
    <>
      <div className="bg-white shadow-sm md:w-full w-[102%] shadow-slate-500/50">
        <div className="p-[10px]">
          <div className=" flex items-center">
            <img
              className="w-12 h-12 object-cover rounded-full mr-3"
              src={
                newUser.profilePicture
                  ? newUser.profilePicture
                  : `https://robohash.org/${newUser.username}`
              }
              alt=""
            />
            <Button className="border-none" onClick={showModal}>
              <input
                placeholder={"What's in your mind " + newUser.username + "?"}
                className="w-full outline-none"
              />
            </Button>
          </div>
          <hr className="m-[20px]" />

          <form className="">
            <div className="flex items-center justify-evenly">
              <div
                className="flex items-center
              "
              >
                <BsFillImageFill htmlColor="tomato" className="text-teal-400" />
                <Button className="border-none" onClick={showModal}>
                  Photo
                </Button>

                <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
                  <ModalShare
                    loading={loading}
                    setLoading={setLoading}
                    setIsModalOpen={setIsModalOpen}
                  />
                </Modal>
              </div>

              <div className="flex  items-center">
                <BsFillCameraVideoFill
                  htmlColor="blue"
                  className="text-xl text-red-400"
                />
                <Button
                  onClick={showModalVideos}
                  className="text-md border-none "
                >
                  Video
                </Button>

                <Modal
                  open={isModalVideos}
                  onCancel={handleCancelVideos}
                  footer={null}
                >
                  <ModalShareVideos setIsModalVideos={setIsModalVideos} />
                </Modal>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
