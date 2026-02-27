export const UserInfoSection = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow border p-6">

      <h3 className="text-lg font-semibold mb-4">
        Información Básica
      </h3>

      <div className="grid grid-cols-2 gap-4 text-sm">

        <div>
          <span className="font-medium">Nombre:</span>
          <p>{user.firstName} {user.lastName}</p>
        </div>

        <div>
          <span className="font-medium">Email:</span>
          <p>{user.email}</p>
        </div>

        <div>
          <span className="font-medium">Rol:</span>
          <p>{user.role}</p>
        </div>

      </div>

    </div>
  );
};