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
  return (
    <section css={chatRoomStyles}>
      <ChatRoomHeader />
      <ChatRoomMain chatData={chatData} />
      <ChatRoomFooter />
    </section>
  );
};

export default ChatRoom;

const chatRoomStyles = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
