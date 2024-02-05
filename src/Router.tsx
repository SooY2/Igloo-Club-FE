import { createBrowserRouter } from 'react-router-dom';
import Login from './login';
import AuthKakao from './login/AuthKakao';
import Landing from './landing/Landing';
import MainPage from './main/pages/mainPage';
import DetailPage from './main/pages/DetailPage';
import FinishMatch from './main/pages/finishMatch';
import Register from './register/RegisterPage';
import NungilList from './nungilList/pages/nungilList';
import ReceivedDetailPage from './nungilList/pages/receivedDetailPage';
import SendDetailPage from './nungilList/pages/sendDetailPage';
import MyPage from './mypage/pages/myPage';
import EditProfilePage from './mypage/pages/editProfilePage';

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
    path: 'main-page',
    element: <MainPage />,
  },
  {
    path: 'detailpage',
    element: <DetailPage />,
  },
  { path: 'finishmatch', element: <FinishMatch /> },
  { path: 'nungillist', element: <NungilList /> },
  { path: 'receiveddetailpage', element: <ReceivedDetailPage /> },
  { path: 'senddetailpage', element: <SendDetailPage /> },
  { path: 'mypage', element: <MyPage /> },
  { path: 'editprofilepage', element: <EditProfilePage /> },
]);

export default router;