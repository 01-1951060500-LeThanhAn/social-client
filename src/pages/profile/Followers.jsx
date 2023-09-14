import React, { useEffect, useState } from "react";
import { getFollowersUsers } from "../../api/users";
import InfoUserFollow from "./InfoUserFollow";

const Followers = ({ user }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchAllFollowers = async () => {
      const res = await getFollowersUsers(user._id);

      setFollowers(res.data);
    };

    fetchAllFollowers();
  }, [user._id]);
  return (
    <>
      <div className="bg-slate-100 min-h-screen">
        <div className="grid grid-cols-1 gap-y-5 mt-4 md:grid-cols-2 lg:grid-cols-3">
          {followers.length > 0 ? (
            <>
              {followers.map((item) => (
                <InfoUserFollow key={item._id} item={item} />
              ))}
            </>
          ) : (
            <div className="text-2xl font-semibold">No followers</div>
          )}
        </div>
      </div>
    </>
  );
};
export default Followers;
