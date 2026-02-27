import { axiosInstance } from "../../../config/axiosInstance";
import { setStudies } from "./studiesSlice";

export const getMyStudies = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosInstance.get("/Studies");
            dispatch(setStudies(data));
            
        } catch (error) {
            console.log("getMyStudies - error:", error.response?.data || error);
            dispatch(setStudies([]));
            throw error;
        }
    };
};