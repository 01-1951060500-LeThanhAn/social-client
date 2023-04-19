import { useEffect, useState } from "react";
import { getUser } from "../api/users";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const useFakeUser = () => {
  const { user } = useContext(AuthContext);

  const [newUser, setNewUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(user?.user._id);

      setNewUser(res.data);
    };

    fetchUser();
  }, [user]);
  return { newUser };
};

export default useFakeUser;
