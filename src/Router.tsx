import { createBrowserRouter } from 'react-router-dom';
import Login from './login';
import AuthKakao from './login/AuthKakao';
import Landing from './landing/Landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
  {
    path: 'login',
    element: <Login />,
  },
  {
    path: '/oauth/kakao/callback',
    element: <AuthKakao />,
  },
]);

export default router;
