import React, { useEffect, useState } from "react";
import { getFollowingsUsers } from "../../api/users";
import InfoUserFollow from "./InfoUserFollow";

const Followings = ({ user }) => {
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const fetchAllFollowings = async () => {
      const res = await getFollowingsUsers(user._id);

      setFollowings(res.data);
    };

    fetchAllFollowings();
  }, [user._id]);
  return (
    <>
      <div className="bg-slate-100 min-h-screen">
        <div className="grid grid-cols-1 gap-y-5 mt-4 md:grid-cols-2 lg:grid-cols-3 ">
          {followings.length > 0 ? (
            <>
              {followings.map((item) => (
                <InfoUserFollow key={item._id} item={item} />
              ))}
            </>
          ) : (
            <div className="text-xl font-semibold">No followings</div>
          )}
        </div>
      </div>
    </>
  );
};
export default Followings;
