import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Menu, Bell, LogOut } from "lucide-react";
import { logoutUser } from "../../../store/slices/auth/authThunks";
import { AppBar } from "./AppBar";

export const NavBar = ({ toggleDrawer, open }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <AppBar open={open}>
            <div className="flex items-center justify-between h-16 px-6 pr-6">
                <div className="flex items-center flex-1">
                    <button
                        onClick={toggleDrawer}
                        className={`
                            p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200
                            mr-9
                            ${open ? 'hidden' : 'block'}
                        `}
                        aria-label="open drawer"
                    >
                        <Menu className="w-5 h-5 text-gray-600" />
                    </button>
                    
                    <h1 className="text-lg font-semibold text-gray-800 flex-1">
                        Dashboard
                    </h1>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-700">
                        {user?.email || 'Usuario'}
                    </span>
                    
                    <button
                        onClick={() => dispatch(logoutUser())}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 relative"
                        aria-label="logout"
                    >
                        <LogOut className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </div>
        </AppBar>
    );
};