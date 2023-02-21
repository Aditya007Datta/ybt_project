const AuthReducer = (state, action) => {
    switch (action.type) {
<<<<<<< HEAD
        case "LOGIN": {
            return {
                currentUser: action.payload,
            };
        }
        case "LOGOUT": {
            return {
                currentUser: null,
            };
        }
        default:
            return state;
    }
};

export default AuthReducer;
=======
      case "LOGIN": {
        return {
          currentUser: action.payload,
        };
      }
      case "LOGOUT": {
        return {
          currentUser: null,
        };
      }
      default:
        return state;
    }
  };
  
  export default AuthReducer;
>>>>>>> 69264f80c29837b683bfded370bfe5c3bddc3b0d
