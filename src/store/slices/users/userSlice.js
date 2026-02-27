import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    isLoading: true,
    selectedUser: null
};
export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload.users;
            state.isLoading = false;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload.selectedUser;
        }
    },
});

export const { setUsers, setSelectedUser } = userSlice.actions;
