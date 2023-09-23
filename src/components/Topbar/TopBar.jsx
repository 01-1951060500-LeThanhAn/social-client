import { Link, useNavigate } from "react-router-dom";
import useInnerWidth from "../../hooks/useInnerWidth";
import { AiOutlineSearch } from "react-icons/ai";
import Logo from "../../images/social.png";
import { useState } from "react";
import useFakeUser from "../../hooks/useFakeUser";
import TippyMenu from "./TippyMenu";
import useSearchParams from "../../hooks/useSearchParams";
export default function Topbar() {
  const { newUser } = useFakeUser();
  const windowSize = useInnerWidth();
  const searchParam = useSearchParams();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(
      `/search?type=${searchParam.get("type") || "post"}&keyword=${query}`
    );
  };

  return (
    <div className="flex z-50 justify-between w-full fixed items-center shadow-md bg-white h-16  top-0">
      <div className="2xl:w-1/3 w-1/5">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img className="w-24 h-24" src={Logo} alt="Social Logo" />
        </Link>
      </div>
      <div
        className="2xl:w-1/3 md:w-1/2 lg:w-1/3 w-1/2
      "
      >
        <form onSubmit={handleSubmit}>
          <div className=" bg-gray-300 rounded-lg relative flex items-center">
            <div className="absolute right-4 text-2xl cursor-pointer">
              <AiOutlineSearch />
            </div>

            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                windowSize.width > 600
                  ? `Search for friend, post or video`
                  : "Search user..."
              }
              className="w-[100%] bg-gray-200 rounded-lg outline-none py-2 pl-4"
            />
          </div>
        </form>
      </div>
      <div className="w-1/3 mr-8 justify-end 2xl:mr-12 md:mr-8 lg:mr-4 flex items-center text-white">
        <p className="mr-3 text-black ">{newUser.username}</p>

        <TippyMenu>
          <img
            src={
              newUser.profilePicture ||
              `https://robohash.org/${newUser.username}`
            }
            alt=""
            className="bg-white w-[32px] h-[32px] object-cover cursor-pointer rounded-full"
          />
        </TippyMenu>
      </div>
    </div>
  );
}
