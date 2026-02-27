import { axiosInstance } from "../../../config/axiosInstance";
import { login, logout } from "./authSlice";
import Swal from "sweetalert2";

export const getLogin = (email, password) => {
  return async (dispatch) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      const newUser = {
        user: {
          id: data.id,
          email: data.email,
          role: data.role,
        },
        token: data.token,
      };

      sessionStorage.setItem("token", JSON.stringify(newUser));

      dispatch(login(newUser));

      Swal.fire({
        title: "Logueado correctamente",
        text: `Bienvenido/a ${data.email}`,
        icon: "success",
      });

    } catch (error) {

      const message =
    error.response?.data?.message ||
    "Credenciales inválidas";

  alert(message);

    }
  };
};

export const checkToken = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        const dataToken = JSON.parse(token);

        if (!token) {
            dispatch(logout());
        }

        dispatch(
            login({
                user: {
                    id: dataToken.user.id,
                    username: dataToken.user.username,
                    email: dataToken.user.email,
                    firstName: dataToken.user.firstName,
                    lastName: dataToken.user.lastName,
                    gender: dataToken.user.gender,
                },
                token: dataToken.token,
            })
        );
    };
};


export const logoutUser = () => {
    return async (dispatch) => {
        try {
             await axiosInstance.post("/auth/logout", { });
            localStorage.removeItem("token");
            dispatch(logout());
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };
};

