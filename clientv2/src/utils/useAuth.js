import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();

  // TODO: add role checking

  const auth = useCallback(() => {
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate, token]);

  return [auth, isAuthenticated];
};

export default useAuth;
