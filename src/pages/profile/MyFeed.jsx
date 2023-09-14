import React, { useEffect, useState } from "react";
import Post from "../../components/Posts/Post";
import Share from "../../components/Share/Share";
import useFakeUser from "../../hooks/useFakeUser";
import { getUser } from "../../api/users";
import { Link } from "react-router-dom";

import { BsBookmark } from "react-icons/bs";
import { AiFillLike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import { RiShareForwardLine } from "react-icons/ri";
import moment from "moment";
import { linkImages } from "../../api";

const MyFeed = ({ username, posts, postData, sharePosts }) => {
  const { newUser } = useFakeUser();

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchSharePostsUser = async () => {
      const res = await getUser(postData?.userId);

      setUser(res.data);
    };

    fetchSharePostsUser();
  }, [postData?.userId]);

  return (
    <div className=" mb-8">
      <div className="mr-2">
        {(!username || username === newUser._id) && <Share />}
        {posts.length > 0 ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p className="text-center text-2xl font-semibold mt-4">
            Chưa đăng post
          </p>
        )}
      </div>

      {sharePosts.length > 0 && (
        <div className="">
          <div className="bg-white shadow-sm shadow-slate-500/50 w-full h-auto lg:h-[480px] mt-5">
            <div className="">
              <div className="flex justify-between items-center mx-4 mt-4">
                <div className="flex items-center mt-2 mb-3">
                  <Link to={`/profile/${postData?.userId}`}>
                    <img
                      className="w-12 h-12 object-cover rounded-full"
                      src={
                        user.profilePicture
                          ? user.profilePicture
                          : `https://robohash.org/${user.username}`
                      }
                      alt=""
                    />
                  </Link>
                  <div className="ml-2 flex flex-col">
                    <span className=" font-bold">{user?.username}</span>
                    <span className="text-slate-400">
                      {moment(postData?.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
                <div className="postBottomRight">
                  <span className="flex items-center text-lg mr-1">
                    <span className="text-xl cursor-pointer">
                      <BsBookmark />{" "}
                    </span>
                  </span>
                </div>
              </div>
              <div className="postCenter">
                <span className="ml-5">{postData?.desc}</span>

                <Link to={`/details/${postData?._id}/${postData?.userId}`}>
                  <img
                    className="w-full mt-4 lg:h-[300px]  object-cover"
                    src={`${linkImages}/${postData?.img}`}
                    alt=""
                  />
                </Link>
              </div>
              <div className="flex justify-between items-center mt-5 mx-5 pb-8">
                <div className="flex items-center">
                  <div
                  // onClick={() => likeHandler(1)}
                  // className={` ${
                  //   isLiked ? "text-blue-600" : ""
                  // } text-2xl cursor-pointer `}
                  >
                    <AiFillLike />
                  </div>

                  <span className="ml-3 ">{0}</span>
                </div>

                <div className="postBottomRight">
                  <span className="flex items-center text-lg mr-1">
                    <span className="text-2xl cursor-pointer">
                      <MdOutlineInsertComment />{" "}
                    </span>
                  </span>
                </div>
                <div className="postBottomRight">
                  <span
                    // onClick={handleSharePost}
                    className="flex items-center text-lg mr-1"
                  >
                    <span className="text-2xl cursor-pointer">
                      <RiShareForwardLine />{" "}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFeed;
