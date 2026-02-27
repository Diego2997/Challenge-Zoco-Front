import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  MapPin,
  GraduationCap,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";

export const mainListItems = (open, role) => {
  const { user } = useSelector((state) => state.auth);
  
  const baseStyle = `
    flex items-center py-2 rounded-lg transition
  `;

  return (
    <div className="space-y-2 px-2">
      
      <NavLink
        to="/profile"
        className={({ isActive }) =>
          `
          ${baseStyle}
          ${open ? "gap-3 px-4 justify-start" : "justify-center px-2"}
          ${
            isActive
              ? "bg-gray-200 font-semibold text-gray-900"
              : "text-gray-700 hover:bg-gray-100"
          }
          `
        }
      >
        <User size={18} />
        {open && <span>Mi Perfil</span>}
      </NavLink>

    
      <NavLink
        to="/addresses"
        className={({ isActive }) =>
          `
          ${baseStyle}
          ${open ? "gap-3 px-4 justify-start" : "justify-center px-2"}
          ${
            isActive
              ? "bg-gray-200 font-semibold text-gray-900"
              : "text-gray-700 hover:bg-gray-100"
          }
          `
        }
      >
        <MapPin size={18} />
        {open && <span>Mis Direcciones</span>}
      </NavLink>

      <NavLink
        to="/studies"
        className={({ isActive }) =>
          `
          ${baseStyle}
          ${open ? "gap-3 px-4 justify-start" : "justify-center px-2"}
          ${
            isActive
              ? "bg-gray-200 font-semibold text-gray-900"
              : "text-gray-700 hover:bg-gray-100"
          }
          `
        }
      >
        <GraduationCap size={18} />
        {open && <span>Mis Estudios</span>}
      </NavLink>

      {user?.role === "Admin" && (
        <NavLink
          to="/users"
          className={({ isActive }) =>
            `
            flex items-center py-2 rounded-lg transition
            ${open ? "gap-3 px-4 justify-start" : "justify-center px-2"}
            ${
              isActive
                ? "bg-gray-200 font-semibold text-gray-900"
                : "text-gray-700 hover:bg-gray-100"
            }
            `
          }
        >
          <Users size={18} />
          {open && <span>Usuarios</span>}
        </NavLink>
      )}
    </div>
  );
};