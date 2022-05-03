import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const auth = useCallback(() => {
    if (!user) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, user]);

  return [auth, isAuthenticated];
};

export default useAuth;
