import { useEffect } from 'react';
import { useLocation, Outlet, useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';

const Landing = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
    const STEP = localStorage.getItem('STEP');
    console.log(pathname);

    if (!ACCESS_TOKEN || !STEP) {
      navigate('/login', { state: pathname });
    } else if (STEP !== '가입완료') {
      navigate('/register');
    } else if (pathname !== '/') {
      navigate(pathname);
    } else {
      navigate('/main-page');
    }
  }, []);

  return (
    <div css={landingStyles}>
      <Outlet />
    </div>
  );
};

export default Landing;

const landingStyles = css`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;
