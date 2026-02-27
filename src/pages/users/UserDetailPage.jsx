import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../../store/slices/users/userThunks";
import { UserInfoSection } from "../../components/user/UserInfoSection";
import { AddressSection } from "../../components/user/AddressSection";
import { StudySection } from "../../components/user/StudySection";

export const UserDetailPage = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedUser, isLoading } = useSelector(state => state.users);

  useEffect(() => {
    dispatch(getUserById(id));
  }, [id, dispatch]);

  if (isLoading) return <p>Cargando...</p>;
  if (!selectedUser) return <p>No encontrado</p>;

  return (
    <div className="p-6 space-y-8">

      <h2 className="text-2xl font-semibold">
        Gestión de Usuario
      </h2>

  
      <UserInfoSection user={selectedUser} />

   
      <AddressSection addresses={selectedUser.addresses} selectedUser={selectedUser}/>


    <StudySection studies={selectedUser.studies} selectedUser={selectedUser} />

    </div>
  );
};