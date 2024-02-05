/**로그인 페이지입니다 */

import { css } from '@emotion/react';
import { kakaoLogin } from '../common/assets/images/0_index';

const Login = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_uri = import.meta.env.VITE_REDIRECT_URI;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div css={containerStyles}>
      <div></div>
      <button onClick={handleLogin} css={buttonStyles} />
    </div>
  );
};

export default Login;

const containerStyles = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 4rem;
`;

const buttonStyles = css`
  display: block;
  width: 34.8rem;
  height: 5.2rem;
  line-height: 100px;
  text-align: center;
  background-image: url(${kakaoLogin});
  background-position: center;
  background-size: cover;
`;
