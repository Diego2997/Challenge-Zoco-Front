import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "../../store/slices/users/userThunks";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AddressModal } from "../../components/user/AddressModal";
import { getMyAddresses } from "../../store/slices/addresses/addressesThunks";

export const AddressesPage = () => {
  const dispatch = useDispatch();
  
  const addresses = useSelector((state) => {
    if (Array.isArray(state.addresses)) return state.addresses;
    if (state.addresses?.addresses && Array.isArray(state.addresses.addresses)) {
      return state.addresses.addresses;
    }
    return [];
  });

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadAddresses = async () => {
    setIsLoading(true);
    try {
      await dispatch(getMyAddresses());
      setError(null);
    } catch (err) {
      setError("Error al cargar las direcciones");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const handleCreate = () => {
    setEditingAddress(null);
    setIsModalOpen(true);
    setError(null);
  };

  const handleEdit = (address) => {
    setEditingAddress(address);
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (addressId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta dirección?')) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteAddress(addressId));
      await loadAddresses(); 
    } catch (err) {
      setError("Error al eliminar la dirección");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleModalSuccess = () => {
    loadAddresses(); 
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Cargando direcciones...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mis Direcciones</h2>
        <button
          onClick={handleCreate}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
          disabled={isDeleting}
        >
          <Plus size={16} />
          Agregar
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {!Array.isArray(addresses) ? (
        <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
          <p>Error: Los datos no tienen el formato correcto</p>
        </div>
      ) : addresses.length === 0 ? (
        <p className="text-sm text-gray-500">
          No tienes direcciones cargadas.
        </p>
      ) : (
        <div className="space-y-3">
          {addresses.map((address) => (
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
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <AddressModal
          address={editingAddress}
          onClose={() => setIsModalOpen(false)}
          onError={setError}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};