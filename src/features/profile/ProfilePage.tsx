import { useAuth } from '../auth/AuthContext';

export const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md">
              {user?.username}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <div className="mt-1 p-2 bg-gray-50 rounded-md capitalize">
              {user?.role}
            </div>
          </div>
          {/* Add more profile fields as needed */}
        </div>
      </div>
    </div>
  );
};
