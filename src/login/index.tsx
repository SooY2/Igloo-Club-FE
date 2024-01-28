/**로그인 페이지입니다 */

const Login = () => {
  const Rest_api_key = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const redirect_url = import.meta.env.VITE_REDIRECT_URL;

  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_url}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return <button onClick={handleLogin}>카카오 로그인</button>;
};

export default Login;
