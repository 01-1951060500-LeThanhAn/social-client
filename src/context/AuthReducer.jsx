const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user?.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case "ADD_POST":
      return {
        ...state,
        items: [...state.items, action.payload],
        offset: state.offset + 1,
      };

    case "DELETE_POST":
      return {
        ...state,
        items: state.items.filter((post) => post._id !== action.payload),
      };
    case "EDIT_POST":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item._id === action.payload._id) {
            return {
              ...item,
              ...action.payload,
            };
          }
        }),
      };

    default:
      return state;
  }
};

export default AuthReducer;
