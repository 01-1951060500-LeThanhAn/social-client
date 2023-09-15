import { useEffect, useState } from "react";

import { AiOutlineMail } from "react-icons/ai";
import { baseApi } from "../../api";
import { toast } from "react-toastify";
import useFakeUser from "../../hooks/useFakeUser";
const ProfileRightbar = ({ follower, followings, user, posts }) => {
  const { newUser } = useFakeUser();
  const [images, setImages] = useState([]);
  const [followed, setFollowed] = useState(
    newUser?.followings?.includes(user?.id)
  );

  useEffect(() => {
    if (posts.length > 0) {
      setImages(
        posts.filter((p) => {
          if (p && p.img) {
            return p.img;
          }
        })
      );
    }
  }, [posts]);

  const handleClick = async () => {
    try {
      if (followed) {
        await baseApi.put(`/api/users/${user._id}/unfollow`, {
          userId: newUser._id,
        });

        toast.success("Unfollow successfully");
      } else {
        await baseApi.put(`/api/users/${user._id}/follow`, {
          userId: newUser._id,
        });
        toast.success("Follow this user successfully");
      }
      setFollowed(!followed);
    } catch (err) {
      toast.error(err);
    }
  };
  return (
    <>
      <div className="px-3 lg:px-8 bg-white h-auto pt-1 py-4 shadow-sm shadow-slate-500/50">
        <h4 className="mt-8 text-2xl font-bold">Intro</h4>
        <p>
          You should learn from your competitor, but never copy. Copy and you
          die.
        </p>

        <div className="bg-slate-100 mt-2 flex items-center py-2 px-2 rounded-xl">
          <div className="text-blue-600 text-xl ">
            <AiOutlineMail />
          </div>
          <p className="ml-2 font-semibold">{user?.email}</p>
        </div>
        <div className="mt-8 flex justify-center items-center">
          <p className="text-xl">
            <span className="font-bold ml-8">{follower}</span> <br /> Folowers
          </p>
          <p className="text-xl ml-8">
            <span className="font-bold ml-8">{followings}</span> <br />{" "}
            Followings
          </p>
          <p className="text-xl ml-8">
            <span className="font-bold ml-4">{posts.length}</span> <br />
            <span className="text-center">Posts</span>
          </p>
        </div>
        <div className="text-center">
          {user._id !== newUser?._id && (
            <button
              className={`${
                followed ? "bg-orange-500" : "bg-blue-600"
              } mt-4 text-white px-8 py-2`}
              onClick={handleClick}
            >
              {followed ? "Unfollow" : "Follow"}
            </button>
          )}
        </div>
        <div className="">
          <div className="bg-white p-3">
            <div className="text-xl font-semibold mb-3">Photo</div>
            {images.length > 0 ? (
              <>
                <div className="grid grid-cols-4 md:grid-cols-3 gap-4">
                  {images.map((post, index) => (
                    <div key={index} className="image">
                      <img
                        className="w-28 h-28 object-cover"
                        src={post?.img}
                        alt=""
                      />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>Not Found</>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileRightbar;
