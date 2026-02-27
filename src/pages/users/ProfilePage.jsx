import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../store/slices/users/userThunks";
import { Pencil, Save, X, MapPin, GraduationCap, Phone, Calendar, Mail, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user: authUser } = useSelector((state) => state.auth);
  
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
  });

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const data = await dispatch(getProfile());
      setProfile(data);
      setForm({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
        phone: data.phone || "",
        birthDate: data.birthDate ? data.birthDate.split('T')[0] : "",
      });
      setError(null);
    } catch (err) {
      setError("Error al cargar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await dispatch(updateProfile(form));
      await loadProfile();
      setIsEditing(false);
      setSuccess("Perfil actualizado correctamente");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar el perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const goToAddresses = () => {
    navigate("/addresses");
  };

  const goToStudies = () => {
    navigate("/studies");
  };

  if (isLoading && !profile) {
    return (
      <div className="p-4 sm:p-6 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mi Perfil</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors w-full sm:w-auto"
          >
            <Pencil size={16} />
            Editar Perfil
          </button>
        )}
      </div>

  
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
          {success}
        </div>
      )}


      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    
        <div className="h-24 sm:h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
        

        <div className="px-4 sm:px-6 py-4">
          {!isEditing ? (
        
            <div className="space-y-4 sm:space-y-6">
          
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                <div className="flex justify-center sm:justify-start">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center -mt-8 sm:-mt-12 border-4 border-white shadow-lg">
                    <span className="text-xl sm:text-2xl font-bold text-gray-600">
                      {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                    </span>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-bold">
                    {profile?.firstName} {profile?.lastName}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600 break-words">{profile?.email}</p>
                </div>
              </div>


              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="border rounded-lg p-3 bg-gray-50 flex items-start gap-2">
                  <Phone size={18} className="text-gray-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Teléfono</p>
                    <p className="font-medium text-sm break-words">{profile?.phone || "No especificado"}</p>
                  </div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50 flex items-start gap-2">
                  <Calendar size={18} className="text-gray-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Fecha de Nacimiento</p>
                    <p className="font-medium text-sm break-words">
                      {profile?.birthDate ? formatDate(profile.birthDate) : "No especificada"}
                    </p>
                  </div>
                </div>
                <div className="border rounded-lg p-3 bg-gray-50 flex items-start gap-2">
                  <UserIcon size={18} className="text-gray-500 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-gray-500">Rol</p>
                    <p className="font-medium">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                        profile?.role === "Admin" 
                          ? "bg-purple-100 text-purple-700" 
                          : "bg-blue-100 text-blue-700"
                      }`}>
                        {profile?.role === "Admin" ? "Administrador" : "Usuario"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

      
              <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                <div 
                  onClick={goToAddresses}
                  className="bg-blue-50 rounded-lg p-3 sm:p-4 text-center border border-blue-100 cursor-pointer hover:bg-blue-100 transition-colors active:bg-blue-200"
                >
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xl sm:text-3xl font-bold text-blue-600">
                    {profile?.addresses?.length || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Direcciones</p>
                  <p className="text-[10px] sm:text-xs text-blue-600 mt-1">Ver todas →</p>
                </div>
                <div 
                  onClick={goToStudies}
                  className="bg-green-50 rounded-lg p-3 sm:p-4 text-center border border-green-100 cursor-pointer hover:bg-green-100 transition-colors active:bg-green-200"
                >
                  <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-1 sm:mb-2" />
                  <p className="text-xl sm:text-3xl font-bold text-green-600">
                    {profile?.studies?.length || 0}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">Estudios</p>
                  <p className="text-[10px] sm:text-xs text-green-600 mt-1">Ver todos →</p>
                </div>
              </div>
            </div>
          ) : (
  
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ej: +54 9 381 1234567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha de Nacimiento
                  </label>
                  <input
                    type="date"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

            
              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setForm({
                      firstName: profile?.firstName || "",
                      lastName: profile?.lastName || "",
                      email: profile?.email || "",
                      phone: profile?.phone || "",
                      birthDate: profile?.birthDate ? profile.birthDate.split('T')[0] : "",
                    });
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors w-full sm:w-auto"
                >
                  <X size={16} />
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition-colors w-full sm:w-auto"
                >
                  <Save size={16} />
                  {isLoading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};