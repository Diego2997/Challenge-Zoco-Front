import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { deleteStudy } from "../../store/slices/users/userThunks";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { StudyModal } from "../../components/user/StudyModal";
import { getMyStudies } from "../../store/slices/studies/studiesThunks";

export const StudiesPage = () => {
  const dispatch = useDispatch();
  
  const studies = useSelector((state) => {
    if (Array.isArray(state.studies)) return state.studies;
    if (state.studies?.studies && Array.isArray(state.studies.studies)) {
      return state.studies.studies;
    }
    return [];
  });

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudy, setEditingStudy] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadStudies = async () => {
    setIsLoading(true);
    try {
      await dispatch(getMyStudies());
      setError(null);
    } catch (err) {
      setError("Error al cargar los estudios");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStudies();
  }, []);

  const handleCreate = () => {
    setEditingStudy(null);
    setIsModalOpen(true);
    setError(null);
  };

  const handleEdit = (study) => {
    setEditingStudy(study);
    setIsModalOpen(true);
    setError(null);
  };

  const handleDelete = async (studyId) => {
    if (!window.confirm('¿Estás seguro de eliminar este estudio?')) return;

    setIsDeleting(true);
    try {
      await dispatch(deleteStudy(studyId));
      await loadStudies(); // Recargar después de eliminar
    } catch (err) {
      setError("Error al eliminar el estudio");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleModalSuccess = () => {
    loadStudies(); // Recargar después de crear/editar
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

  if (isLoading) {
    return (
      <div className="p-6">
        <p>Cargando estudios...</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Mis Estudios</h2>
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

      {!Array.isArray(studies) ? (
        <div className="p-4 bg-yellow-100 text-yellow-700 rounded-lg">
          <p>Error: Los datos no tienen el formato correcto</p>
        </div>
      ) : studies.length === 0 ? (
        <p className="text-sm text-gray-500">
          No tienes estudios cargados.
        </p>
      ) : (
        <div className="space-y-3">
          {studies.map((study) => (
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

              <div className="flex gap-3 ml-4">
                <button 
                  onClick={() => handleEdit(study)}
                  className="text-blue-600 hover:text-blue-800"
                  disabled={isDeleting}
                  title="Editar estudio"
                >
                  <Pencil size={16} />
                </button>

                <button 
                  onClick={() => handleDelete(study.id)}
                  className="text-red-600 hover:text-red-800"
                  disabled={isDeleting}
                  title="Eliminar estudio"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <StudyModal
          study={editingStudy}
          onClose={() => setIsModalOpen(false)}
          onError={setError}
          onSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
};