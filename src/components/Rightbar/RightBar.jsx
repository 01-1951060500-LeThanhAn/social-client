import UserItem from "../User/UserItem";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/users";
import SkeletonRightBar from "../Skeleton/SkeletonRightBar";
import useFakeUser from "../../hooks/useFakeUser";

export default function Rightbar() {
  const [users, setUsers] = useState([]);
  const { newUser } = useFakeUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchAllUser = async () => {
      const res = await getAllUsers();
      setUsers(res.data);
      setLoading(true);
    };

    const timing = setTimeout(() => {
      setLoading(false);
      fetchAllUser();
    }, 1000);

    return () => clearTimeout(timing);
  }, []);
  return (
    <>
      <div className="fixed lg:w-[32%] md:w-[45%] ">
        {loading ? (
          <div className="bg-white  mr-16 mt-5 py-3 px-3 shadow-lg">
            <div className=" text-xl font-bold">Suggesstion for you</div>
            {users.map((item) =>
              item._id === newUser._id ? (
                ""
              ) : (
                <UserItem loading={loading} item={item} key={item._id} />
              )
            )}
          </div>
        ) : (
          <>
            <div className="2xl:w-[420px] 2xl:h-auto pb-8 fixed lg:w-[25%] md:w-[37%] shadow-sm shadow-slate-500/50 bg-white 2xl:pr-16 mt-5">
              <div
                className="grid grid-cols-1 
              "
              >
                <div className="h-16">
                  <SkeletonRightBar />
                </div>
                <div className="h-16">
                  <SkeletonRightBar />
                </div>
                <div className="h-16">
                  <SkeletonRightBar />
                </div>
                <div className="h-16">
                  <SkeletonRightBar />
                </div>
                <div className="h-16">
                  <SkeletonRightBar />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
