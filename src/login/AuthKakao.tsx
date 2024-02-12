/**카카오 로그인 통신하는 컴포넌트입니다 */

import { useEffect } from 'react';
import { signInInstance } from '../common/apis/axiosInstanse';
import { useNavigate } from 'react-router-dom';

const AuthKakao = () => {
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get('code');
  const navigate = useNavigate();

  const handleKakaoSignIn = async () => {
    try {
      const res = await signInInstance.post('/api/auth/kakao', {
        code: AUTHORIZE_CODE,
      });
      console.log(res);
      const { accessToken, isProfileRegistered } = res.data;
      if (accessToken) {
        localStorage.setItem('ACCESS_TOKEN', accessToken);
        if (isProfileRegistered) navigate('/main-page');
        else navigate('/register');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (AUTHORIZE_CODE) {
      handleKakaoSignIn();
    }
  }, []);

  return <div>로그인 하는중,,</div>;
};

export default AuthKakao;
