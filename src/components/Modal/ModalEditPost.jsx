import React, { useContext, useState } from "react";
import OverLay from "../../components/Modal/OverlayModal";
import { toast } from "react-toastify";
import { editPosts } from "../../context/AuthAction";
import { AuthContext } from "../../context/AuthContext";
import { editPost } from "../../api/post";
const ModalEditPost = ({
  setShow,
  setLoading,
  post,
  loading,
  desc,
  setDesc,
}) => {
  const { dispatch } = useContext(AuthContext);

  const [data, setData] = useState(post);
  // console.log(data);

  const handleEditPost = async (e) => {
    e.preventDefault();
    if (!desc) {
      return toast.error("Không được để chống description!");
    }

    setLoading(true);

    try {
      const res = await editPost(post._id, desc);

      dispatch(editPosts(res.data));
      setData({ ...data, desc: res.data.desc });

      setShow(false);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <>
      <OverLay setShow={setShow}>
        <div className="bg-white w-96 h-48">
          <div className="text-center my-4 text-2xl font-semibold">
            Edit Post description
          </div>
          <div className="text-center">
            <form onSubmit={handleEditPost} className="">
              <input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="border-2 outline-none px-3 py-2"
                type="text"
                placeholder="Edit post"
              />

              <div className="mt-6">
                {" "}
                <button
                  type="submit"
                  className="bg-blue-600 text-white
                 px-5 py-2"
                >
                  Updated
                </button>
              </div>
            </form>
          </div>
        </div>
      </OverLay>
    </>
  );
};

export default ModalEditPost;
