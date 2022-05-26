import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import selections from '../data/navSelections';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token, role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  const currentPage = location.pathname;
  const roleAllowed = selections[role].some((page) => page.path === currentPage);

  const auth = useCallback(() => {
    if(token && (currentPage === '/' || roleAllowed)) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate, token, currentPage, roleAllowed]);

  return [auth, isAuthenticated];
};

export default useAuth;
