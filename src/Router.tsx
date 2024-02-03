import { createBrowserRouter } from 'react-router-dom';
import Login from './login';
import AuthKakao from './login/AuthKakao';
import Landing from './landing/Landing';
import MainPage from './main/pages/mainPage';
import DetailPage from './main/pages/DetailPage';
import FinishMatch from './main/pages/finishMatch';
import Register from './register/RegisterPage';

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
    path: 'register',
    element: <Register />,
  },
  {
    path: '/oauth/kakao/callback',
    element: <AuthKakao />,
  },
  {
    path: 'mainpage',
    element: <MainPage />,
  },
  {
    path: 'detailpage',
    element: <DetailPage />,
  },
  { path: 'finishmatch', element: <FinishMatch /> },
]);

export default router;
