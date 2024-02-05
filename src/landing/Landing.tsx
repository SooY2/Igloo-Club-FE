import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

      if (!ACCESS_TOKEN) {
        navigate('/login');
      } else if (location.pathname === '/') {
        navigate('/main-page');
      } else {
        navigate(location.pathname);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, location.pathname]);

  return <div>Landing</div>;
};

export default Landing;
