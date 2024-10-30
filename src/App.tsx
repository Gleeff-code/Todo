import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

export const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/sign-in');
    }
  }, [navigate]);
  return <Outlet />;
};
