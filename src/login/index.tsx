/**로그인 페이지입니다 */

import { css } from '@emotion/react';
import { HeroImage } from '../common/assets/images/0_index';
import styled from '@emotion/styled';
import { 약관동의리스트 } from '../common/constants/memberAgreeConstants';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Login = () => {
  const { state } = useLocation();
  useEffect(() => {
    if (state) localStorage.setItem('path', state);
    else localStorage.setItem('path', '/main-page');
  }, []);

  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;
  const guidement = '옆으로 넘겨 가이드 보기 >>>';

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div css={{ overflowY: 'scroll', width: '100%', maxWidth: '425px' }}>
      <img src={HeroImage} css={backgroundImage} />
      <div css={containerStyles}>
        <StGuide>{guidement}</StGuide>
        <StButton onClick={handleLogin}>카카오톡으로 로그인하기</StButton>
      </div>
      <Footer>
        <StFooterTitle>(주) 멋쟁이사자처럼</StFooterTitle>
        <div css={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p>서울 종로구 종로3길17, 광화문D타워 D1동 16층, 17층</p>
          <div css={{ display: 'flex', gap: '1rem' }}>
            <p>대표 나성영</p>
            <p>|</p>
            <p>사업자등록번호: 264-88-01106</p>
          </div>
          <p>문의 nungil.official@gmail.com</p>
          <p>Copyright © 멋쟁이사자처럼 All rights reserved</p>
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

const backgroundImage = css`
  position: absolute;
  z-index: 1;
  width: 100%;
  max-width: 425px;
  height: 100vh;
`;

const containerStyles = css`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: end;
  width: 100%;
  height: 100vh;
  padding: 0 4rem 10rem;
`;

// const logoBoxStyles = css`
//   display: flex;
//   flex-direction: column;
//   gap: 2rem;
//   align-items: center;
//   justify-content: center;
// `;

// const StLogo = styled.img`
//   width: 10rem;
// `;

// const StExplain = styled.p`
//   color: ${({ theme }) => theme.colors.primary};
//   ${({ theme }) => theme.fonts.subtitle2b};
// `;

const StGuide = styled.p`
  color: ${({ theme }) => theme.colors.gray4};
  color: ${({ theme }) => theme.fonts.body2b};
`;

const StButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  height: 5.2rem;
  padding-left: 2rem;
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
  padding-left: 2rem;
  margin-bottom: 3rem;

  ${({ theme }) => theme.fonts.body3m};
`;

const StFooterTitle = styled.p`
  ${({ theme }) => theme.fonts.body1};
`;
