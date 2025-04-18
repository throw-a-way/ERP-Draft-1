import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';
import { useAuth } from '../features/auth/AuthContext';
import { ROUTES } from '../shared/constants/routes';
import { useState } from 'react';

export const Header = () => {
  const { user } = useAuth();
  const [imageError, setImageError] = useState(false);

  // Function to handle image load error
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {/* Page title can be passed as prop if needed */}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.username}
            </span>
            <Link
              to={ROUTES.MY_PROFILE}
              className="p-2 text-gray-600 hover:text-purple-600 rounded-full hover:bg-gray-100 transition-colors"
              title="My Profile"
            >
              {user?.profileImageUrl && !imageError ? (
                <img
                  src={user.profileImageUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={handleImageError}
                />
              ) : (
                <UserCircle className="w-8 h-8" />
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
