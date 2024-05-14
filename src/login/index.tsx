/**로그인 페이지입니다 */

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { 약관동의리스트 } from '../common/constants/memberAgreeConstants';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

import './styles/slick.css';
import './styles/slick-theme.css';
import { Hero } from '../common/assets/images/0_index';

const Login = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (state) localStorage.setItem('path', state);
    else localStorage.setItem('path', '/main-page');
  }, []);

  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div css={loginContainer}>
      <img src={Hero} css={backgroundImage} />
      <div css={containerStyles}>
        <StLoginBox>
          <StButton onClick={handleLogin}>카카오톡으로 로그인하기</StButton>
        </StLoginBox>
      </div>
      <Footer>
        <StFooterTitle>(주) 눈길</StFooterTitle>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <p>문의 nungil.official@gmail.com</p>
          <p>Copyright © 눈길 All rights reserved</p>
        </div>
        <div css={{ display: 'flex', gap: '1rem' }}>
          <p onClick={() => window.open(약관동의리스트[1].url, '_blank')}>
            {약관동의리스트[1].title}
          </p>
          <p>|</p>
          <p onClick={() => window.open(약관동의리스트[0].url, '_blank')}>
            {약관동의리스트[0].title}
          </p>
        </div>
      </Footer>
    </div>
  );
};

export default Login;

const loginContainer = css`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  overflow-y: scroll;
`;

const backgroundImage = css`
  position: absolute;
  z-index: 1;
  width: 100vw;
  max-width: 42.5rem;
`;

const containerStyles = css`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: start;
  justify-content: start;
  width: 100%;
  height: 100vh;
  padding: 6rem 3rem 4rem;
`;

const StLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const StButton = styled.button`
  position: absolute;
  bottom: 9rem;
  display: block;
  width: 95%;
  height: 5.2rem;
  padding-left: 2rem;
  margin: 1.6rem 2rem 1.9rem;
  color: #34221d;
  text-align: center;
  background-color: #fae100;
  background-image: url('https://www.innergarm.com/design/rtx22/re_2022/kakao_login_icon.svg');
  background-repeat: no-repeat;
  background-attachment: initial;
  background-position-x: 1.2rem;
  background-position-y: center;
  background-clip: initial;
  background-origin: initial;
  background-size: 26px;
  border-radius: 5px;

  ${({ theme }) => theme.fonts.body1b};
`;

const Footer = styled.footer`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 3rem;
  margin-top: 4rem;
  margin-bottom: 3rem;
  color: #fff;

  ${({ theme }) => theme.fonts.body3m};
`;

const StFooterTitle = styled.p`
  ${({ theme }) => theme.fonts.body1};
`;
