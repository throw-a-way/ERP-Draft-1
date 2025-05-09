import { Link, useLocation } from 'react-router-dom';
import { Home, Users, UserCircle, GraduationCap } from 'lucide-react';
import { useAuth } from '../../features/auth/AuthContext';
import { ROUTES } from '../constants/routes';

export const Sidebar = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const isActive = (path: string) => {
    // For home/dashboard, check exact match
    if (path === ROUTES.DASHBOARD) {
      return location.pathname === ROUTES.DASHBOARD ? 'bg-blue-100' : '';
    }
    // For other routes, use startsWith to include sub-routes
    return location.pathname.startsWith(path) ? 'bg-blue-100' : '';
  };

  // Check if user is a student
  const isStudent = user?.role === 'student';
  
  // Only faculty roles can access My Students
  const canAccessMyStudents = !isStudent && (user?.role === 'dean' || user?.role === 'coordinator' || user?.role === 'hod');
  
  // Only dean and coordinator can access coordinator section
  const canAccessCoordinator = user?.role === 'dean' || user?.role === 'coordinator';

  return (
    <div className="w-64 bg-white border-r h-screen">
      <div className="p-4">
        <Link to={ROUTES.DASHBOARD} className="flex items-center space-x-2">
          <Home className="w-8 h-8 text-purple-600" />
          <span className="text-purple-600 font-medium">National Institute Of Technology, Srinagar</span>
        </Link>
      </div>
      <nav className="mt-8 px-4">
        <Link to={ROUTES.DASHBOARD} className={`flex items-center space-x-2 p-3 rounded-lg mb-2 ${isActive(ROUTES.DASHBOARD)}`}>
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link to={ROUTES.MY_PROFILE} className={`flex items-center space-x-2 p-3 rounded-lg mb-2 ${isActive(ROUTES.MY_PROFILE)}`}>
          <UserCircle className="w-5 h-5" />
          <span>My Profile</span>
        </Link>
        
        {canAccessMyStudents && (
          <Link to={ROUTES.MY_STUDENTS} className={`flex items-center space-x-2 p-3 rounded-lg mb-2 ${isActive(ROUTES.MY_STUDENTS)}`}>
            <GraduationCap className="w-5 h-5" />
            <span>My Students</span>
          </Link>
        )}

        {canAccessCoordinator && (
          <Link to={ROUTES.COORDINATOR} className={`flex items-center space-x-2 p-3 rounded-lg ${isActive(ROUTES.COORDINATOR)}`}>
            <Users className="w-5 h-5" />
            <span>Coordinator</span>
          </Link>
        )}
      </nav>
    </div>
  );
};