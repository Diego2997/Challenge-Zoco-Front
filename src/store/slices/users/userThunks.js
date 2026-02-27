import { axiosInstance } from "../../../config/axiosInstance";
import { setUsers, setSelectedUser } from "./userSlice";

export const getAllUsers = () => {
    return async (dispatch) => {
        try {
            const urlUsers = "/users";
            const { data } = await axiosInstance.get(urlUsers);
            dispatch(setUsers({ users: data }));
        } catch (error) {
            console.log("error", error);
        }
    };
};

export const getUserById = (id) => {
    return async (dispatch) => {
        try {
            const urlUser = `/users/${id}`;
            const { data } = await axiosInstance.get(urlUser);
            dispatch(setSelectedUser({ selectedUser: data }));
        } catch (error) {
            console.log("error", error);
        } 
    };
};

export const createAddress = (data) => {
    return async (dispatch) => {
        try {
            await axiosInstance.post("/Addresses", data);
        } catch (error) {
            throw error; 
        }
    };
};

export const updateAddress = (addressId, data) => {
    return async (dispatch) => {
        try {
            await axiosInstance.put(`/Addresses/${addressId}`, data);
        } catch (error) {
            throw error;
        }
    };
};

export const deleteAddress = (addressId) => {
    return async (dispatch) => {
        try {
            await axiosInstance.delete(`/Addresses/${addressId}`);
        } catch (error) {
            throw error;
        }
    };
};

export const createStudy = (data) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.post("/Studies", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
};

export const updateStudy = (studyId, data) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.put(`/Studies/${studyId}`, data);
            return response.data;
        } catch (error) {
            console.log("error en updateStudy:", error.response?.data || error);
            throw error;
        }
    };
};

export const deleteStudy = (studyId) => {
    return async (dispatch) => {
        try {
            const response = await axiosInstance.delete(`/Studies/${studyId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    };
};

export const getProfile = () => {
  return async (dispatch) => {
    try {
      console.log("getProfile - obteniendo perfil");
      const response = await axiosInstance.get("/Users/profile");
      console.log("getProfile - datos recibidos:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};

export const updateProfile = (data) => {
  return async (dispatch) => {
    try {
      console.log("updateProfile - data:", data);
      const response = await axiosInstance.put("/Users", data);
      console.log("updateProfile - respuesta:", response.data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
};