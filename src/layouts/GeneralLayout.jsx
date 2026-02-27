import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { SideBar } from "../components/ui/sidebar/SideBar";
import { UsersPage } from "../pages/users/UsersPage";
import { UserDetailPage } from "../pages/users/UserDetailPage";
import { AddressesPage } from "../pages/addresses/AddressesPage";
import { StudiesPage } from "../pages/studies/StudiesPage";
import { ProfilePage } from "../pages/users/ProfilePage";

export function GeneralLayout() {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (mobile) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className={`min-h-screen bg-gray-50 w-full ${isMobile ? 'mt-14' : 'mt-0'} `}>
      
      <SideBar open={open} toggleDrawer={toggleDrawer} />

      <main
        className="transition-all duration-300 w-full"
        style={{
          paddingLeft: isMobile ? "0px" : open ? "240px" : "64px",
        }}
      >
        <div className={`
          w-full 
          ${isMobile ? 'px-0' : 'p-6'}
        `}>
          <Routes>
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
            <Route path="/addresses" element={<AddressesPage />} />
            <Route path="/studies" element={<StudiesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}