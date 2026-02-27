import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
    createAddress,
    updateAddress,
} from "@/store/slices/users/userThunks";

export const AddressModal = ({ address, onClose, onError, onSuccess }) => {
    const dispatch = useDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const [form, setForm] = useState({
        street: "",
        number: "",
        floor: "",
        apartment: "",
        city: "",
        province: "",
        country: "",
        postalCode: "",
    });

    useEffect(() => {
        if (address) {
            setForm({
                street: address.street || "",
                number: address.number?.toString() || "",
                floor: address.floor || "",
                apartment: address.apartment || "",
                city: address.city || "",
                province: address.province || "",
                country: address.country || "",
                postalCode: address.postalCode || "",
            });
        }
    }, [address]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "number" && value !== "" && !/^\d+$/.test(value)) {
            return;
        }

        setForm({
            ...form,
            [name]: value,
        });
        
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.street.trim()) newErrors.street = "La calle es requerida";
        if (!form.number) newErrors.number = "El número es requerido";
        if (!form.city.trim()) newErrors.city = "La ciudad es requerida";
        if (!form.province.trim()) newErrors.province = "La provincia es requerida";
        if (!form.country.trim()) newErrors.country = "El país es requerido";
        if (!form.postalCode.trim()) newErrors.postalCode = "El código postal es requerido";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;

        setIsSubmitting(true);
        
        try {
            const addressData = {
                street: form.street,
                number: parseInt(form.number, 10),
                floor: form.floor || null,
                apartment: form.apartment || null,
                city: form.city,
                province: form.province,
                country: form.country,
                postalCode: form.postalCode
            };

            console.log("Enviando datos:", addressData);

            if (address) {
                await dispatch(updateAddress(address.id, addressData));
                console.log("Dirección actualizada exitosamente");
            } else {
                // Crear
                await dispatch(createAddress(addressData));
                console.log("Dirección creada exitosamente");
            }

            onSuccess(); 
            onClose();  
            
        } catch (error) {
            console.error("Error al guardar:", error);
            const errorMessage = error.response?.data?.title || 
                               error.response?.data?.message ||
                               "Error al guardar la dirección";
            onError(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-lg w-96 space-y-3">
                <h3 className="text-lg font-semibold">
                    {address ? "Editar Dirección" : "Nueva Dirección"}
                </h3>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <div>
                            <input 
                                name="street" 
                                value={form.street} 
                                onChange={handleChange} 
                                placeholder="Calle *" 
                                className={`w-full border rounded p-2 ${errors.street ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
                        </div>

                        <div>
                            <input 
                                name="number" 
                                value={form.number} 
                                onChange={handleChange} 
                                placeholder="Número *" 
                                className={`w-full border rounded p-2 ${errors.number ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number}</p>}
                        </div>

                        <input 
                            name="floor" 
                            value={form.floor} 
                            onChange={handleChange} 
                            placeholder="Piso (opcional)" 
                            className="w-full border rounded p-2"
                            disabled={isSubmitting}
                        />

                        <input 
                            name="apartment" 
                            value={form.apartment} 
                            onChange={handleChange} 
                            placeholder="Departamento (opcional)" 
                            className="w-full border rounded p-2"
                            disabled={isSubmitting}
                        />

                        <div>
                            <input 
                                name="city" 
                                value={form.city} 
                                onChange={handleChange} 
                                placeholder="Ciudad *" 
                                className={`w-full border rounded p-2 ${errors.city ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>

                        <div>
                            <input 
                                name="province" 
                                value={form.province} 
                                onChange={handleChange} 
                                placeholder="Provincia *" 
                                className={`w-full border rounded p-2 ${errors.province ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province}</p>}
                        </div>

                        <div>
                            <input 
                                name="country" 
                                value={form.country} 
                                onChange={handleChange} 
                                placeholder="País *" 
                                className={`w-full border rounded p-2 ${errors.country ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
                        </div>

                        <div>
                            <input 
                                name="postalCode" 
                                value={form.postalCode} 
                                onChange={handleChange} 
                                placeholder="Código Postal *" 
                                className={`w-full border rounded p-2 ${errors.postalCode ? 'border-red-500' : ''}`}
                                disabled={isSubmitting}
                            />
                            {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
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