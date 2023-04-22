import { useEffect, useState } from "react";
import Post from "../Posts/Post";
import Share from "../Share/Share";
import { Tabs } from "antd";
import { getPosts } from "../../api/post";
import BannerSkeleton from "../Skeleton/SkeletonPost";
import { getAllVideos } from "../../api/videos";
import Video from "../Video/Video";

const { TabPane } = Tabs;

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        const res = await getAllVideos();
        setVideos(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );

        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    const timing = setTimeout(() => {
      fetchVideos();
    }, 500);

    return () => {
      clearTimeout(timing);
    };
  }, []);

  useEffect(() => {
    setLoading(true);

    const timing = setTimeout(() => {
      fetchPosts();

      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timing);
    };
  }, []);

  return (
    <>
      <div className="flex-[10] bg-slate-100 h-full mr-3">
        <div className=" py-[20px] px-[20px]">
          <Share loading={loading} setLoading={setLoading} />
          <Tabs className="">
            <TabPane tab="Posts" key="tab-a">
              {!loading ? (
                posts.map((post) => (
                  <Post
                    key={post._id}
                    loading={loading}
                    setLoading={setLoading}
                    post={post}
                    posts={posts}
                    setPosts={setPosts}
                    username={username}
                  />
                ))
              ) : (
                <>
                  <div className="mt-5">
                    {" "}
                    <BannerSkeleton />
                  </div>
                </>
              )}
            </TabPane>
            <TabPane tab="Video" key="tab-b">
              <div className="bg-slate-100">
                {!loading ? (
                  videos.map((post) => (
                    <Video
                      key={post._id}
                      loading={loading}
                      setLoading={setLoading}
                      post={post}
                      videos={videos}
                      setVideos={setVideos}
                      username={username}
                    />
                  ))
                ) : (
                  <>
                    <div className="mt-5">
                      {" "}
                      <BannerSkeleton />
                    </div>
                  </>
                )}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}
