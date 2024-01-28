/**카카오 로그인 통신하는 컴포넌트입니다 */

import { signInInstance } from '../common/apis/axiosInstanse';

const AuthKakao = () => {
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get('code');

  console.log(AUTHORIZE_CODE);

  const handleKakaoSignIn = async () => {
    try {
      const data = await signInInstance.post('/api/auth/kakao', {
        code: AUTHORIZE_CODE,
      });
      console.log(data);
      // localStorage.setItem('ACCESS_TOKEN', accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  handleKakaoSignIn();

  return <div>Auth Kakao</div>;
};

export default AuthKakao;
