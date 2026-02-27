import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/auth/authSlice";
import { userSlice } from "./slices/users/userSlice";
import { studiesSlice } from "./slices/studies/studiesSlice";
import { addressesSlice } from "./slices/addresses/addressesSlice";



export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: userSlice.reducer,
        studies: studiesSlice.reducer,
        addresses: addressesSlice.reducer
    },
});
