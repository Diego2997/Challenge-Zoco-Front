import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addresses: [],
    isLoading: false,
    error: null
};

export const addressesSlice = createSlice({
    name: "addresses",
    initialState,
    reducers: {
        setAddresses: (state, action) => {
            state.addresses = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearAddresses: (state) => {
            state.addresses = [];
            state.error = null;
        }
    }
});

export const { setAddresses, setLoading, setError, clearAddresses } = addressesSlice.actions;