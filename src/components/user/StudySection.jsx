import { Plus, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StudyModal } from './StudyModal';
import {
    deleteStudy,
    getUserById,
} from "@/store/slices/users/userThunks";
export const StudySection = ({ studies, selectedUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [editingStudy, setEditingStudy] = useState(null);
    const [error, setError] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isReloading, setIsReloading] = useState(false);
    
    const dispatch = useDispatch();
    const { user: authUser } = useSelector((state) => state.auth);
    
    const isOwnProfile = authUser?.id === selectedUser?.id;
    const isAdmin = authUser?.role === "Admin";

    const canCreate = isOwnProfile; 
    const canModify = isOwnProfile || isAdmin; 

    const handleCreate = () => {
        if (!canCreate) {
            setError("No tienes permiso para crear estudios en este perfil");
            return;
        }
        setEditingStudy(null); 
        setIsOpen(true);         
        setError(null);
    };

    const handleEdit = (study) => {
        if (!canModify) {
            setError("No tienes permiso para editar este estudio");
            return;
        }
        setEditingStudy(study);
        setIsOpen(true);
        setError(null);
    };

    const handleDelete = async (studyId) => {
        if (!canModify) {
            setError("No tienes permiso para eliminar este estudio");
            return;
        }

        if (!window.confirm('¿Estás seguro de eliminar este estudio?')) {
            return;
        }

        setIsDeleting(true);
        setError(null);
        
        try {
            await dispatch(deleteStudy(studyId));
            await dispatch(getUserById(userId));
        } catch (error) {
            setError(error.response?.data?.message || "Error al eliminar el estudio");
        } finally {
            setIsDeleting(false);
        }
    };

    const handleModalClose = async (shouldReload = false) => {
        setIsOpen(false);
        if (shouldReload) {
            setIsReloading(true);
            try {
                await dispatch(getUserById(userId));
            } catch (error) {
                console.error("Error al recargar:", error);
                setError("Error al actualizar los datos");
            } finally {
                setIsReloading(false);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-AR', { year: 'numeric', month: 'long' });
    };

    const getLevelText = (level) => {
        const levels = {
            'Primary': 'Primario',
            'Secondary': 'Secundario',
            'Tertiary': 'Terciario',
            'University': 'Universitario',
            'Postgraduate': 'Posgrado',
            'Other': 'Otro'
        };
        return levels[level] || level;
    };

    const getStatusText = (status) => {
        const statuses = {
            'InProgress': 'En curso',
            'Completed': 'Completo',
            'Paused': 'Pausado',
            'Abandoned': 'Abandonado'
        };
        return statuses[status] || status;
    };

    return (
        <div className="bg-white rounded-xl shadow border p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                    Estudios
                    {isReloading && (
                        <span className="ml-2 text-sm text-gray-500">(Actualizando...)</span>
                    )}
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

            {studies?.length === 0 ? (
                <p className="text-sm text-gray-500">
                    No tiene estudios cargados.
                </p>
            ) : (
                <div className="space-y-3">
                    {studies?.map((study) => (
                        <div
                            key={study.id}
                            className="border rounded-lg p-4 flex justify-between items-start"
                        >
                            <div className="text-sm flex-1">
                                <p className="font-medium">
                                    {study.title} - {study.institution}
                                </p>
                                <p className="text-gray-600">
                                    {getLevelText(study.level)} · {getStatusText(study.status)}
                                </p>
                                <p className="text-gray-600">
                                    {formatDate(study.startDate)} - {
                                        study.status === 'InProgress' 
                                            ? 'Actualidad' 
                                            : formatDate(study.endDate)
                                    }
                                </p>
                                {study.description && (
                                    <p className="text-gray-500 mt-1 text-xs">
                                        {study.description}
                                    </p>
                                )}
                            </div>

                            {canModify && (
                                <div className="flex gap-3 ml-4">
                                    <button 
                                        onClick={() => handleEdit(study)}
                                        className="text-blue-600 hover:text-blue-800"
                                        disabled={isDeleting || isReloading}
                                        title="Editar estudio"
                                    >
                                        <Pencil size={16} />
                                    </button>

                                    <button 
                                        onClick={() => handleDelete(study.id)}
                                        className="text-red-600 hover:text-red-800"
                                        disabled={isDeleting || isReloading}
                                        title="Eliminar estudio"
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
                <StudyModal
                    study={editingStudy}
                    userId={userId}
                    onClose={handleModalClose}
                    onError={setError}
                    isAdmin={isAdmin}
                    isOwnProfile={isOwnProfile}
                />
            )}
        </div>
    );
};