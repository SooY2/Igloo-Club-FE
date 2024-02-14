import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../../common/apis/axiosInstanse';
import { CHATDATA } from '../../constants/ChatData';
import ChatRoomMain from './ChatRoomMain';
import ChatRoomHeader from './ChatRoomHeader';
import { css } from '@emotion/react';
import { ChatDataTypes } from '../../types/chatDataTypes';
import ChatRoomFooter from './ChatRoomFooter';

/** 채팅방 컴포넌트입니다 */
const ChatRoom = () => {
  const { chatRoomId } = useParams();
  const [chatData] = useState<ChatDataTypes[]>(CHATDATA.content);
  const [chatSenderInfo] = useState({
    animalFace: '',
    companyName: '',
    job: '',
    nickname: '',
  });
  const [chat, setChat] = useState('');

  useEffect(() => {
    getChatData();
  }, [chatRoomId]);

  const getChatData = async () => {
    try {
      const res = await instance.get(`api/chat/room/${chatRoomId}`);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = () => {
    console.log(chat, '전송!');
    setChat('');
  };
  return (
    <section css={chatRoomStyles}>
      <ChatRoomHeader
        animalFace={chatSenderInfo.animalFace}
        companyName={chatSenderInfo.companyName}
        job={chatSenderInfo.job}
        nickname={chatSenderInfo.nickname}
        chatRoomId={chatRoomId}
        css={HeaderBox}
      />
      <ChatRoomMain chatData={chatData} css={MainBox} />
      <ChatRoomFooter
        chat={chat}
        setChat={setChat}
        handleSubmit={handleSubmit}
      />
    </section>
  );
};

export default ChatRoom;

const chatRoomStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeaderBox = css`
  z-index: 999;
`;

const MainBox = css`
  z-index: 1;
`;
