import React, { useRef, useState } from "react";
import moment from "moment";
const VideoCard = ({ data }) => {
  const videoRef = useRef();
  const [pause, setPause] = useState(false);

  const handlePauseVideo = () => {
    setPause(!pause);
    pause ? videoRef.current.play() : videoRef.current.pause();
  };

  return (
    <>
      <div className="bg-white shadow-md shadow-slate-500/50 md:w-2/3 md:mx-auto lg:w-1/2 2xl:w-1/3 h-96 my-8 text-black mx-3">
        <div className="flex justify-between items-center">
          <div className="mx-3 pt-4 flex items-center">
            <div className="">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={data?.userId?.profilePicture}
                alt=""
              />
            </div>
            <div className="text-black">
              <p
                className="text-xl ml-3
                  "
              >
                {data?.userId?.username}
              </p>
            </div>
          </div>

          <div className="text-slate-400 mr-3">
            <p>{moment(data?.createdAt).fromNow()}</p>
          </div>
        </div>
        <div className="">
          <div onClick={handlePauseVideo}>
            <video
              ref={videoRef}
              controls
              className="w-full px-3 py-3 h-64 object-cover"
            >
              <source src={data?.videos} type="video/mp4" />
            </video>
          </div>
          <div className="mx-3 my-2">
            <p>{data.desc}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
