import React, { useEffect, useState } from "react";
import SkeletonPost from "../../components/Skeleton/SkeletonPost";
import useFakeUser from "../../hooks/useFakeUser";
import AllPostSave from "../../components/SavePost/AllPostSave";
import { getSavePost } from "../../api/post";
const PostSave = ({ id }) => {
  const { newUser } = useFakeUser();
  const [savePosts, setSavePosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchSavePosts = async () => {
      const res = await getSavePost(newUser._id);

      setLoading(true);
      setSavePosts(res.data?.savedPosts);
    };

    const timing = setTimeout(() => {
      setLoading(false);
      fetchSavePosts();
    }, 1500);

    return () => clearTimeout(timing);
  }, [newUser._id]);

  return (
    <>
      <div className="save">
        {savePosts.length > 0 ? (
          loading ? (
            savePosts.map((post) => (
              <div key={post}>
                {post.saveBy === newUser._id && (
                  <AllPostSave
                    setSavePosts={setSavePosts}
                    savePosts={savePosts}
                    post={post}
                    id={id}
                  />
                )}
              </div>
            ))
          ) : (
            <div className="w-1/2 mx-auto">
              <SkeletonPost />
            </div>
          )
        ) : (
          <div className="h-screen bg-slate-100">
            <p className="text-2xl text-center">There are no save post!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default PostSave;
