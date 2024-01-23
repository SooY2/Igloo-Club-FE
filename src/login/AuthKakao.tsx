/**카카오 로그인 통신하는 컴포넌트입니다 */

const AuthKakao = () => {
  const AUTHORIZE_CODE = new URL(window.location.href).searchParams.get('code');

  console.log(AUTHORIZE_CODE);

  return <div>AuthKakao</div>;
};

export default AuthKakao;
