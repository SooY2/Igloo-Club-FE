import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logo } from '../common/assets/images/0_index';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Landing = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');
      const STEP = localStorage.getItem('STEP');

      if (!ACCESS_TOKEN) {
        navigate('/login');
      }
      if (STEP !== '가입완료') {
        navigate('/register');
      } else {
        navigate(location.pathname);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, location.pathname]);

  return (
    <div css={landingStyles}>
      <StImg src={logo} alt="눈길" />
      <StTitle>눈길, 인연을 만나보세요</StTitle>
    </div>
  );
};

export default Landing;

const landingStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;
const StImg = styled.img`
  width: 10rem;
`;
const StTitle = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.fonts.subtitle2b};
`;
