import { createBrowserRouter } from 'react-router-dom';
import Login from './login';
import AuthKakao from './login/AuthKakao';
import Landing from './landing/Landing';
import MainPage from './main/mainPage';
import Profile from './main/profile';
import FinishMatch from './main/finishMatch';
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
    path: 'profile',
    element: <Profile />,
  },
  { path: 'finishmatch', element: <FinishMatch /> },
]);

export default router;
