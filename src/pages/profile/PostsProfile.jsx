import React, { useState } from "react";
import ProfileRightbar from "./ProfileRightbar";
import MyFeed from "./MyFeed";
import { getSharePost } from "../../api/post";
import useFakeUser from "../../hooks/useFakeUser";
import { useEffect } from "react";
import { baseApi } from "../../api";

const PostsProfile = ({ user, username, posts, follower, followings }) => {
  const [sharePosts, setSharePosts] = useState([]);
  const { newUser } = useFakeUser();

  const [postData, setPostData] = useState({});
  useEffect(() => {
    const fetchSharePosts = async () => {
      const res = await getSharePost(newUser._id);

      setSharePosts(
        res.data
          .map((item) => item)
          .sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
      );
    };

    fetchSharePosts();
  }, [newUser._id]);

  useEffect(() => {
    const fetchSharePostsId = async () => {
      const res = await baseApi.get(`/api/posts/${sharePosts}`);
      console.log(res.data);
      setPostData(res.data);
    };

    fetchSharePostsId();
  }, [sharePosts]);

  return (
    <>
      <div className="flex flex-col w-full justify-center md:flex-row">
        <div className=" h-auto w-full 2xl:w-1/2 md:w-1/2 md:mr-4 mt-8">
          <ProfileRightbar
            user={user}
            posts={posts}
            follower={follower}
            followings={followings}
          />
        </div>
        <div className="w-full 2xl:w-3/5 md:w-1/2 2xl:ml-24 mt-8">
          <MyFeed
            sharePosts={sharePosts}
            postData={postData}
            posts={posts}
            username={username}
          />
        </div>
      </div>
    </>
  );
};
export default PostsProfile;
