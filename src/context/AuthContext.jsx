import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("profile")),
  isFetching: false,
  error: false,
  items: [],
  offset: 0,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(state.user));

    localStorage.setItem("token", JSON.stringify(state.user?.token));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
        items: state.items,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
