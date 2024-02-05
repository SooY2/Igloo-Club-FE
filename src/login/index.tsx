/**로그인 페이지입니다 */

import { css } from '@emotion/react';
import { logo } from '../common/assets/images/0_index';
import styled from '@emotion/styled';

const Login = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div css={containerStyles}>
      <div css={logoBoxStyles}>
        <StLogo src={logo}></StLogo>
        <StExplain>지금 눈길로 인연을 찾아보세요!</StExplain>
      </div>
      <StButton onClick={handleLogin}>카카오톡으로 로그인하기</StButton>
    </div>
  );
};

export default Login;

const containerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 15rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10rem 4rem;
`;
const logoBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const StLogo = styled.img`
  width: 10rem;
`;

const StExplain = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  ${({ theme }) => theme.fonts.subtitle2b};
`;

const StButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  height: 5.2rem;
  padding-left: 2rem;
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
