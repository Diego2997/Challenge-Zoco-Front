import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddressModal } from './AddressModal';
import {
    deleteAddress,
    getUserById,
} from "@/store/slices/users/userThunks";


export const AddressSection = ({ addresses, selectedUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((state) => state.auth);
    
    const isOwnProfile = authUser?.id === selectedUser?.id;
    const isAdmin = authUser?.role === "Admin";

    const canCreate = isOwnProfile; 
    const canModify = isOwnProfile || isAdmin; 

    const handleCreate = () => {
        if (!canCreate) {
            setError("No tienes permiso para crear direcciones en este perfil");
            return;
        }
        setEditingAddress(null); 
        setIsOpen(true);         
        setError(null);
    };

    const handleEdit = (address) => {
        if (!canModify) {
            setError("No tienes permiso para editar esta dirección");
            return;
        }
        setEditingAddress(address);
        setIsOpen(true);
        setError(null);
    };

    const handleDelete = async (addressId) => {
        if (!canModify) {
            setError("No tienes permiso para eliminar esta dirección");
            return;
        }

        if (!window.confirm('¿Estás seguro de eliminar esta dirección?')) {
            return;
        }

        setIsDeleting(true);
        setError(null);
        
        try {
            await dispatch(deleteAddress(addressId));
            await dispatch(getUserById(selectedUser.id));
        } catch (error) {
            setError(error.response?.data?.message || "Error al eliminar la dirección");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleModalClose = (shouldReload = false) => {
        setIsOpen(false);
        if (shouldReload) {
            dispatch(getUserById(selectedUser.id));
        }
    };

    return (
        <div className="bg-white rounded-xl shadow border p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                    Direcciones
                </h3>

                {canCreate && (
                    <button
                        onClick={handleCreate}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                        disabled={isDeleting}
                    >
                        <Plus size={16} />
                        Agregar
                    </button>
                )}
                
                {!canCreate && isAdmin && (
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        Vista de administrador (solo lectura para crear)
                    </span>
                )}
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {addresses?.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No tiene direcciones cargadas.
                </p>
            ) : (
                <div className="space-y-3">
                    {addresses?.map((address) => (
                        <div
                            key={address.id}
                            className="border rounded-lg p-4 flex justify-between items-center"
                        >
                            <div className="text-sm">
                                <p className="font-medium">
                                    {address.street} {address.number}
                                    {address.floor && `, Piso ${address.floor}`}
                                    {address.apartment && `, Depto ${address.apartment}`}
                                </p>
                                <p className="text-gray-600">
                                    {address.city} - {address.province}
                                </p>
                                <p className="text-gray-600">
                                    {address.country} ({address.postalCode})
                                </p>
                            </div>

                            {canModify && (
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleEdit(address)}
                                        className="text-blue-600 hover:text-blue-800"
                                        disabled={isDeleting}
                                        title="Editar dirección"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(address.id)}
                                        className="text-red-600 hover:text-red-800"
                                        disabled={isDeleting}
                                        title="Eliminar dirección"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {isOpen && (
                <AddressModal
                    address={editingAddress}
                    userId={selectedUser.id}
                    onClose={handleModalClose}
                    onError={setError}
                    isAdmin={isAdmin}
                    isOwnProfile={isOwnProfile}
                />
            )}
        </div>
    );
};