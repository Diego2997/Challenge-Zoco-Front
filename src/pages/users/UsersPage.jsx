import { useEffect, useState } from "react";
import { useDispatch,useSelector} from "react-redux";
import { getAllUsers } from "../../store/slices/users/userThunks";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const UsersPage = () => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Lista de Usuarios
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Nombre</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Rol</th>
              <th className="px-6 py-3 text-center">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
           {users && users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium text-gray-700">
                  {user.id}
                </td>
                <td className="px-6 py-4 text-gray-700">
                  {user.firstName} {user.lastName}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {user.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
  <div className="flex items-center justify-center gap-3">


<button
  onClick={() => navigate(`/users/${user.id}`)}
  className="text-blue-600 hover:text-blue-800 transition"
>
  <Pencil size={18} />
</button>

    <button
      onClick={() => {
        setSelectedUserId(user.id);
        setIsDeleteOpen(true);
      }}
      className="text-red-600 hover:text-red-800 transition"
    >
      <Trash2 size={18} />
    </button>

  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDeleteOpen && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-80">

      <h3 className="text-lg font-semibold mb-4">
        ¿Seguro que querés eliminar?
      </h3>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => setIsDeleteOpen(false)}
          className="px-4 py-2 bg-gray-200 rounded-lg"
        >
          Cancelar
        </button>

        <button
          onClick={() => {
            dispatch(deleteUser(selectedUserId));
            setIsDeleteOpen(false);
            dispatch(getAllUsers());
          }}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Eliminar
        </button>
      </div>

    </div>
  </div>
)}

    </div>
  );
};