import {
    DeleteUser,
    GetUser,
    GetUsers,
    UpdateUser,
  
} from "../constants/actionTypes";
export default (state = { isAdmin: false , isLoading: true, user: {} }, action) => {
    switch (action.type) {
        case "START_LOADING":
            return { ...state, isLoading: true };
        case "END_LOADING":
            return { ...state, isLoading: false };
        case GetUsers:
            
            
            return {
                ...state,
                users: action.payload.data,

                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
               
            };

        case GetUser:

            return { ...state, user: action.payload.user ,
               
            };

        case UpdateUser:
            return {
                ...state,
                // user: state.user.map((user) =>
                //     user._id === action.payload._id ? action.payload : user),
                user:action.payload.data
                
            };
        case DeleteUser:
            return {
                ...state,
                user: state.user.filter((user) => user._id !== action.payload),
            };
        default:
            return state;
    }
};
