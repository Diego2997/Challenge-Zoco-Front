import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    studies: [],
    isLoading: false,
    error: null
};

export const studiesSlice = createSlice({
    name: "studies",
    initialState,
    reducers: {
        setStudies: (state, action) => {
            state.studies = action.payload;
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

export const { setStudies, setLoading, setError, clearStudies } = studiesSlice.actions;