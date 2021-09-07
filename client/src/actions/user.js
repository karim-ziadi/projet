import * as api from "../api/index.js";
import {
    DeleteUser,
    GetUser,
    START_LOADING,
    UpdateUser,
    GetUsers,
} from "../constants/actionTypes.js";
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getUsers;
        dispatch({ type: GetUsers, payload: { user: data } });
    } catch (error) {
        console.log(error);
    }
};
export const getUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const { data } = await api.getUser(id);
        dispatch({ type: GetUser, payload: { user: data } });
        console.log(`this is ${data}`);
    } catch (error) {
        console.log(error);
    }
};
export const updateUser = (id, user) => async (dispatch) => {
    try {
        const { data } = await api.updateUser(id, user);
        // console.log(data);
        dispatch({ type: UpdateUser, payload: { user: data } });
    } catch (error) {
        console.log(error);
    }
};
export const deleteUser = (id) => async (dispatch) => {
    try {
        await api.deleteUser(id);
        dispatch({ type: DeleteUser, payload: id });
    } catch (error) {
        console.log(error);
    }
};