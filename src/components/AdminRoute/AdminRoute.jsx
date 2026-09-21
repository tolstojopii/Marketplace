import { Navigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

function AdminRoute({ children }) {
  const user = useAuthStore((s) => s.user);
  const loading = useAuthStore((s) => s.loading);

  if (loading) {
    return <div style={{ padding: 40, textAlign: 'center' }}>Загрузка...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminRoute;