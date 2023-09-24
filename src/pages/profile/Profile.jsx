import TopBar from "../../components/Topbar/TopBar";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { baseApi } from "../../api";
import { Tabs } from "antd";
import { AiOutlineEdit } from "react-icons/ai";
import PostsProfile from "./PostsProfile";
import Followings from "./Followings";

import Followers from "./Followers";
import ModalUpdateUser from "./ModalUpdateUser";
import { getUser } from "../../api/users";
import useFakeUser from "../../hooks/useFakeUser";
import { postConversation } from "../../api/conversation";
import PostSave from "./PostSave";

const { TabPane } = Tabs;

export default function Profile() {
  const [user, setUser] = useState({});
  const [follower, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);
  const { _id } = useParams();
  const [posts, setPosts] = useState([]);
  const { newUser } = useFakeUser();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = _id
        ? await baseApi.get("/api/posts/profile/" + _id)
        : await baseApi.get("/api/posts/timeline/" + newUser._id);

      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [_id, newUser._id]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(_id);
      // console.log(res.data);
      setFollowers(res.data.followers.length);
      setFollowings(res.data.followings.length);
      setUser(res.data);
    };
    fetchUser();
  }, [_id]);

  const fetchConversation = async () => {
    try {
      await postConversation(newUser._id, _id);
      navigate("/messenger");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TopBar />
      <div className="bg-slate-100">
        <div className="">
          <div>
            <div className="h-[350px] relative flex justify-center items-center">
              <img
                className="2xl:w-[80%]  w-full lg:w-[90%] h-[320px] object-cover"
                src={`https://www.searchenginejournal.com/wp-content/uploads/2021/09/16-reasons-why-social-media-is-important-to-your-company-616d3200e6dc6-sej.png`}
                alt=""
              />
              <img
                alt=""
                className="w-[150px] h-[150px] rounded-full absolute md:left-0 md:right-0 2xl:right-0 left-5 mx-auto bg-white 2xl:left-0 object-cover top-[240px]"
                src={
                  user.profilePicture
                    ? user.profilePicture
                    : `https://robohash.org/${user.username}`
                }
              />
            </div>
            <div className="flex flex-col justify-start md:justify-center md:items-center ml-6">
              <h4 className="mt-12 text-2xl font-bold">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>

            {user._id === newUser._id ? (
              <div
                onClick={() => setShow(true)}
                className="absolute  flex items-center 2xl:top-[440px] top-[403px] bg-blue-600 text-white px-3 py-1 text-lg cursor-pointer right-5 md:right-10 lg:right-14 2xl:right-80"
              >
                <div className="text-xl mr-1">
                  <AiOutlineEdit />
                </div>
                <button> Edit Profile</button>
              </div>
            ) : (
              <div
                onClick={fetchConversation}
                className="absolute flex items-center 2xl:top-[440px] top-[403px] bg-blue-600 text-white px-3 py-1 text-lg cursor-pointer right-5 md:right-10 lg:right-14 2xl:right-80"
              >
                <div className="text-xl mr-1">
                  <AiOutlineEdit />
                </div>
                <button>Chat Messenger</button>
              </div>
            )}
          </div>

          <div className="2xl:mx-56 mx-6 mt-4 md:mx-4">
            <Tabs className="md:ml-5 lg:ml-8">
              <TabPane tab="Posts" key="tab-a">
                <PostsProfile
                  user={user}
                  posts={posts}
                  follower={follower}
                  followings={followings}
                  username={_id}
                />
              </TabPane>
              <TabPane tab="Followings" key="tab-b">
                <div className="bg-white">
                  <Followings user={user} />
                </div>
              </TabPane>
              <TabPane tab="Followers" key="tab-c">
                <div className="bg-white">
                  <Followers user={user} />
                </div>
              </TabPane>
              {_id === newUser._id ? (
                <TabPane tab="Post Saved" key="tab-d">
                  <div className="">
                    <PostSave id={_id} />
                  </div>
                </TabPane>
              ) : null}
            </Tabs>
          </div>

          {show && <ModalUpdateUser user={user} setShow={setShow} />}
        </div>
      </div>
    </>
  );
}
