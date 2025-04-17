import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { PrivateRoute } from './shared/components/PrivateRoute';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LoginPage, SignupPage } from './features/auth';
import { HomePage } from './features/dashboard';
import { MyStudentsPage } from './features/students';
import { CoordinatorPage } from './features/coordinator';
import { ROUTES } from './shared/constants/routes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
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
          <Route path="/" element={<Navigate to={ROUTES.LOGIN} />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;