import { axiosInstance } from "../../../config/axiosInstance";
import { setAddresses } from "./addressesSlice";

export const getMyAddresses = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosInstance.get("/Addresses");
            const addresses = Array.isArray(data) ? data : [];
            dispatch(setAddresses(addresses));
            
        } catch (error) {
            console.log("getMyAddresses - error:", error.response?.data || error);
            dispatch(setAddresses([]));
            throw error;
        }
    };
};