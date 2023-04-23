import React, { useEffect, useState } from "react";
import useSearchParams from "../../hooks/useSearchParams";
import { searchPost } from "../../api/post";
import { searchUser } from "../../api/users";
import { Link } from "react-router-dom";
import PostCard from "../Posts/PostCard";
import UserCard from "../User/UserCard";
import Topbar from "../Topbar/TopBar";
import { BarWave } from "react-cssfx-loading";
import { searchVideo } from "../../api/videos";
import VideoCard from "../Video/VideoCard";
const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("keyword");
  const type = searchParams.get("type");

  const fetchSearchResults = async () => {
    setLoading(true);

    if (type === "post") {
      try {
        const res = await searchPost(searchTerm);

        if (res.data.success) {
          setResults(res.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    } else if (type === "video") {
      try {
        const res = await searchVideo(searchTerm);

        if (res.data.success) {
          setResults(res.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const res = await searchUser(searchTerm);
        if (res.data.success) {
          setResults(res.data.results);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    setLoading(true);

    const timing = setTimeout(() => {
      fetchSearchResults();
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timing);
    };
  }, [searchTerm, type]);

  return (
    <>
      <Topbar />
      <div className="bg-white mt-16 h-full">
        <div className="p-6">
          <div className="ml-4 flex md:justify-center items-center">
            <Link
              className={`${
                type === "post" ? "bg-blue-600 text-white" : ""
              } block py-1 px-4`}
              to={`/search?type=post&keyword=${searchTerm}`}
            >
              Posts
            </Link>

            <Link
              className={`${
                type === "video" ? "bg-blue-600 text-white" : ""
              } block py-1 px-4`}
              to={`/search?type=video&keyword=${searchTerm}`}
            >
              Videos
            </Link>

            <Link
              to={`/search?type=user&keyword=${searchTerm}`}
              className={`${
                type === "user" ? "bg-blue-600 text-white" : ""
              } block py-1 px-4  ml-3`}
            >
              Users
            </Link>
          </div>
        </div>

        {!loading ? (
          <div>
            {results.length > 0 ? (
              <div className="w-full bg-white h-full">
                {results.map((p) =>
                  type === "post" ? (
                    <PostCard key={p?._id} data={p} />
                  ) : type === "video" ? (
                    <>
                      <VideoCard key={p?._id} data={p} />
                    </>
                  ) : (
                    <UserCard key={p?._id} data={p} />
                  )
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-center items-center ">
                  {/* <div className="bg-slate-100 h-screen">
                    <p className="text-center text-2xl mt-1/2">No Resuts</p>
                  </div> */}
                  <img
                    className="w-1/2 object-contain h-[600px]"
                    src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=740&t=st=1682239200~exp=1682239800~hmac=65a820291ee1d42f7c3d91c49b2c68655b3cf507f7c3263a70e1bf5b5d896682"
                    alt=""
                  />
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            <div className="full-height flex items-center justify-center">
              <div className="fixed bg-slate-100 top-0 bottom-0 right-0 left-0 flex flex-col items-center justify-center">
                <BarWave color="blue" width={50} height={50} />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SearchResults;
