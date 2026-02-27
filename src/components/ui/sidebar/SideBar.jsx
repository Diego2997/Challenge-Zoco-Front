import React, { useState, useEffect } from 'react';
import { ChevronLeft, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/slices/auth/authThunks';
import { Drawer } from './Drawer';
import { mainListItems } from '../../../config/MenuItem';
import { HamburgerButton } from './HamburgerButton';
import { useNavigate } from 'react-router-dom';

export const SideBar = ({ toggleDrawer, open }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            if (mobile && open) {
                toggleDrawer();
            }
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };


    const handleMenuClick = () => {
        if (isMobile) {
            toggleDrawer(); 
        }
    };

    return (
        <>
         
            {isMobile && !open && <HamburgerButton onClick={toggleDrawer} />}

            <Drawer open={open} isMobile={isMobile} onClose={toggleDrawer}>
                <div className="flex flex-col h-full bg-white">
                    <div className={`
                        flex items-center h-16 px-4 border-b border-gray-200
                        ${open ? 'justify-between' : 'justify-center'}
                    `}>
                        {open && (
                            <div className="flex items-center space-x-3 overflow-hidden">
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-medium text-gray-700 truncate">
                                        {user?.email || 'Usuario'}
                                    </span>
                                </div>
                            </div>
                        )}
                        
                        <button
                            onClick={toggleDrawer}
                            className={`
                                p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 text-gray-600
                                flex-shrink-0
                                ${!open && 'mx-auto'}
                                ${isMobile && open ? 'block' : ''}
                            `}
                            aria-label={open ? "Colapsar menú" : "Expandir menú"}
                        >
                            <ChevronLeft 
                                className={`
                                    w-5 h-5 transition-transform duration-300
                                    ${!open ? 'rotate-180' : ''}
                                `} 
                            />
                        </button>
                    </div>

            
                    <nav className="flex-1 py-4 overflow-y-auto" onClick={handleMenuClick}>
                        {mainListItems(open, user?.role)}
                    </nav>

                    <div className="border-t border-gray-200 p-4">
                        <button
                            onClick={handleLogout}
                            className={`
                                flex items-center w-full px-4 py-2 text-sm text-red-600 
                                hover:bg-red-50 rounded-lg transition-colors duration-200
                                ${!open && 'justify-center'}
                            `}
                            title={!open ? "Cerrar sesión" : ""}
                        >
                            <LogOut className="w-5 h-5 flex-shrink-0" />
                            {open && <span className="ml-3 truncate">Cerrar sesión</span>}
                        </button>
                    </div>
                </div>
            </Drawer>
        </>
    );
};