import { useAuth } from '../context/AuthContext.jsx';
import { Navigate } from 'react-router';
import { PAGE_REDIRECT_TO } from '../constants/pageRedirect.js';
import { isSessionExpired } from '../utils/auth.js';

function ProtectedRoute({
  children,
  redirectTo = '/login',
  guestOnly = false
}) {
  const isExpired = isSessionExpired();
  const { isAuthenticated, user } = useAuth();

  if (!guestOnly && isExpired) {
    return <Navigate to={redirectTo} state={{
      isExpired
    }} replace />;
  }
  if (guestOnly && isAuthenticated && !isExpired)
    return <Navigate to={PAGE_REDIRECT_TO[user.role]}
      replace />;
  if (!guestOnly && !isAuthenticated)
    return <Navigate to={redirectTo} state={{
      isExpired
    }} replace />;
  return children;
}

export default ProtectedRoute;
