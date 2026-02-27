import * as React from "react";
import { useDispatch } from "react-redux";
import { Lock } from "lucide-react";
import useForm from "../../hooks/useForm";
import { getLogin } from "../../store/slices/auth/authThunks";

export const LoginPage = () => {
    const dispatch = useDispatch();

    const { formState, handleChange } = useForm();

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formState);
        dispatch(getLogin(formState.email, formState.password));
    };

    return (
        <div className="flex flex-col items-center w-full max-w-md mx-auto">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 mb-4">
                <Lock className="w-6 h-6 text-white" />
            </div>
            
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">
               Challenge Zoco
            </h1>
            
            <form 
                onSubmit={handleSubmit}
                className="w-full space-y-4"
                noValidate
            >
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="text"
                        required
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Ingresa tu email"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="current-password"
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Ingresa tu contraseña"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors duration-200"
                >
                    INGRESAR
                </button>

                {/* <div className="flex items-center justify-between text-sm">
                    <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline">
                        Recuperar Contraseña?
                    </a>
                    <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline">
                        Registrarse
                    </a>
                </div> */}
            </form>
        </div>
    );
};