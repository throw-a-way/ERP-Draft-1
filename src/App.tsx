import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { PrivateRoute } from './shared/components/PrivateRoute';
import { DashboardLayout } from './shared/layouts/DashboardLayout';
import { LoginPage, SignupPage, StudentLogin } from './features/auth';
import { HomePage } from './features/dashboard';
import { MyStudentsPage } from './features/students';
import { CoordinatorPage } from './features/coordinator';
import { ProfilePage } from './features/profile';
import { LandingPage } from './features/auth/LandingPage';
import { ROUTES } from './shared/constants/routes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path={ROUTES.FACULTY_LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.STUDENT_LOGIN} element={<StudentLogin />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/my-profile" element={<ProfilePage />} />
                    <Route
                      path="/my-students"
                      element={
                        <PrivateRoute allowedRoles={['dean', 'coordinator', 'hod']}>
                          <MyStudentsPage />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/coordinator/*"
                      element={
                        <PrivateRoute allowedRoles={['dean', 'coordinator']}>
                          <CoordinatorPage />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </DashboardLayout>
              </PrivateRoute>
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;