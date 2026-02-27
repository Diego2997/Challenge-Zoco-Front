import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
    createStudy,
    updateStudy,
} from "@/store/slices/users/userThunks";

export const StudyModal = ({ study, onClose, onError, onSuccess }) => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        institution: "",
        title: "",
        level: "",
        status: "",
        startDate: "",
        endDate: "",
        description: "",
    });

    useEffect(() => {
        if (study) {
            setForm({
                institution: study.institution || "",
                title: study.title || "",
                level: study.level || "",
                status: study.status || "",
                startDate: study.startDate ? study.startDate.split('T')[0] : "",
                endDate: study.endDate ? study.endDate.split('T')[0] : "",
                description: study.description || "",
            });
        }
    }, [study]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setForm({
            ...form,
            [name]: value,
        });
        
        // Limpiar error del campo cuando el usuario escribe/selecciona
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.institution.trim()) newErrors.institution = "La institución es requerida";
        if (!form.title.trim()) newErrors.title = "El título es requerido";
        if (!form.level) newErrors.level = "El nivel es requerido";
        if (!form.status) newErrors.status = "El estado es requerido";
        if (!form.startDate) newErrors.startDate = "La fecha de inicio es requerida";
        
        // Validar fecha de fin si no está en curso
        if (form.status !== 'InProgress' && !form.endDate) {
            newErrors.endDate = "La fecha de fin es requerida para estudios finalizados";
        }
        
        // Validar que fecha fin sea posterior a fecha inicio
        if (form.startDate && form.endDate && form.status !== 'InProgress') {
            if (new Date(form.endDate) <= new Date(form.startDate)) {
                newErrors.endDate = "La fecha de fin debe ser posterior a la fecha de inicio";
            }
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        try {
            const studyData = {
                institution: form.institution,
                title: form.title,
                level: form.level,
                status: form.status,
                startDate: form.startDate,
                endDate: form.status === 'InProgress' ? null : form.endDate,
                description: form.description || null,
            };

            console.log("Enviando datos:", studyData);

            if (study) {
                // Actualizar
                await dispatch(updateStudy(study.id, studyData));
                console.log("Estudio actualizado exitosamente");
            } else {
                // Crear
                await dispatch(createStudy(studyData));
                console.log("Estudio creado exitosamente");
            }

            onSuccess(); // Recargar lista
            onClose();   // Cerrar modal
            
        } catch (error) {
            console.error("Error al guardar:", error);
            const errorMessage = error.response?.data?.title || 
                               error.response?.data?.message ||
                               "Error al guardar el estudio";
            onError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-3">
                <h3 className="text-lg font-semibold">
                    {study ? "Editar Estudio" : "Nuevo Estudio"}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        {/* Nivel */}
                        <div>
                            <select
                                name="level"
                                value={form.level}
                                onChange={handleChange}
                                className={`w-full border rounded p-2 ${errors.level ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            >
                                <option value="">Seleccionar nivel *</option>
                                <option value="Primary">Primario</option>
                                <option value="Secondary">Secundario</option>
                                <option value="Tertiary">Terciario</option>
                                <option value="University">Universitario</option>
                                <option value="Postgraduate">Posgrado</option>
                                <option value="Other">Otro</option>
                            </select>
                            {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level}</p>}
                        </div>

                        {/* Estado */}
                        <div>
                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className={`w-full border rounded p-2 ${errors.status ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            >
                                <option value="">Seleccionar estado *</option>
                                <option value="InProgress">En curso</option>
                                <option value="Completed">Completo</option>
                                <option value="Paused">Pausado</option>
                                <option value="Abandoned">Abandonado</option>
                            </select>
                            {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status}</p>}
                        </div>

                        {/* Institución */}
                        <div>
                            <input 
                                name="institution" 
                                value={form.institution} 
                                onChange={handleChange} 
                                placeholder="Institución *" 
                                className={`w-full border rounded p-2 ${errors.institution ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
                        </div>

                        {/* Título */}
                        <div>
                            <input 
                                name="title" 
                                value={form.title} 
                                onChange={handleChange} 
                                placeholder="Título *" 
                                className={`w-full border rounded p-2 ${errors.title ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        {/* Fecha Inicio */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Fecha Inicio *</label>
                            <input 
                                type="date"
                                name="startDate" 
                                value={form.startDate} 
                                onChange={handleChange} 
                                className={`w-full border rounded p-2 ${errors.startDate ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                        </div>

                        {/* Fecha Fin */}
                        <div>
                            <label className="block text-sm text-gray-600 mb-1">Fecha Fin</label>
                            <input 
                                type="date"
                                name="endDate" 
                                value={form.endDate} 
                                onChange={handleChange} 
                                disabled={form.status === 'InProgress' || isSubmitting}
                                className={`w-full border rounded p-2 ${errors.endDate ? 'border-red-500' : ''} ${form.status === 'InProgress' ? 'bg-gray-100' : ''}`}
                            />
                            {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                        </div>

                        {/* Descripción */}
                        <div>
                            <textarea 
                                name="description" 
                                value={form.description} 
                                onChange={handleChange} 
                                placeholder="Descripción (opcional)" 
                                rows="3"
                                className="w-full border rounded p-2"
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-lg"
                            disabled={isSubmitting}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-blue-300"
                        >
                            {isSubmitting ? 'Guardando...' : 'Guardar'}
                        </button>
                    </div>
                </form>

                <p className="text-xs text-gray-500 mt-2">* Campos requeridos</p>
            </div>
        </div>
    );
};