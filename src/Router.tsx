import { createBrowserRouter } from 'react-router-dom';
import Login from './login';
import AuthKakao from './login/AuthKakao';
import Landing from './landing/Landing';
import Register from './register/RegisterPage';
import MainPage from './main/pages/mainPage';
import DetailPage from './main/pages/DetailPage';
import FinishMatch from './main/pages/finishMatch';
import NungilList from './nungilList/pages/nungilList';
import ReceivedDetailPage from './nungilList/pages/receivedDetailPage';
import SendDetailPage from './nungilList/pages/sendDetailPage';
import MyPage from './mypage/pages/myPage';
import EditProfilePage from './mypage/pages/editProfilePage';
import Chat from './chat/Chat';
import ChatRoom from './chat/components/chatRoom/ChatRoom';
// import 사전신청완료 from './common/components/RegisterAdvanceApplication';

const router = createBrowserRouter([
  {
    path: '',
    element: <Landing />,
    children: [
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: '/oauth/kakao/callback',
        element: <AuthKakao />,
      },
      {
        path: '/main-page',
        element: <MainPage />,
      },
      {
        path: 'detailpage/:nungilId',
        element: <DetailPage />,
      },
      { path: 'finishmatch/:nungilId', element: <FinishMatch /> },
      { path: 'nungillist', element: <NungilList /> },
      { path: 'receiveddetailpage/:nungilId', element: <ReceivedDetailPage /> },
      { path: 'senddetailpage/:nungilId', element: <SendDetailPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'editprofilepage', element: <EditProfilePage /> },
      { path: 'chat', element: <Chat /> },
      { path: 'chat/:chatRoomId', element: <ChatRoom /> },
    ],
  },
  {
    path: 'login',
    element: <Login />,
  },
]);

export default router;
