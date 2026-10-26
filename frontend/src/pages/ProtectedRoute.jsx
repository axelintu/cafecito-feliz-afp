import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router';
import { PAGE_REDIRECT_TO } from '../constants/pageRedirect.js';

function ProtectedRoute({
  children,
  redirectTo = '/login',
  guestOnly = false
}) {
  const { isAuthenticated, user } = useAuth();
  if (guestOnly && isAuthenticated)
    return <Navigate to={PAGE_REDIRECT_TO[user.role]}
      replace />;
  if (!guestOnly && !isAuthenticated)
    return <Navigate to={redirectTo} replace />;
  return children;
}

export default ProtectedRoute;
