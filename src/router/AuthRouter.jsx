import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '../auth/pages/Login';
import Solicitudes from '../auth/pages/Solicitudes';
import { AppRoutes } from '../services/routes/AppRoutes';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/user.context';

export const AuthRouter = () => {
  const { user, employeeId } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      // Guarda información del usuario en el sessionStorage al iniciar sesión
      sessionStorage.setItem('user', user.user_name);
      sessionStorage.setItem('user_id', user.user_id);
      sessionStorage.setItem('profile', user.profile_id);
      sessionStorage.setItem('status', user.status);
    }
    if (employeeId) {
      // Guarda información del usuario en el sessionStorage al iniciar sesión
      sessionStorage.setItem('user_id', employeeId.user_id);
    }
  }, [user, employeeId]);

  // Componente de protección de rutas
  const ProtectedRoute = ({ element }) => {
    return user ? element : <Navigate to="/" />;
  };

  // const ProtectedRoute2 = ({ element }) => {
  //   return employeeId ? element : <Navigate to="/solicitudes" />;
  // };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/solicitudes" element={<ProtectedRoute element={<Solicitudes />} />} />
      <Route path="/*" element={<ProtectedRoute element={<AppRoutes />} />} />
    </Routes>
  );
};