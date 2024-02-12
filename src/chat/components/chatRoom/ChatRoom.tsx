import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../../common/apis/axiosInstanse';
import ChatRoomMain from './ChatRoomMain';
import ChatRoomHeader from './ChatRoomHeader';
import { css } from '@emotion/react';
import ChatRoomFooter from './ChatRoomFooter';
import { Client } from '@stomp/stompjs';
import { ChatDataTypes } from '../../types/chatDataTypes';

const PAGESIZE = 12;

/** 채팅방 컴포넌트입니다 */
const ChatRoom = () => {
  const { chatRoomId } = useParams();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatData, setChatData] = useState<ChatDataTypes[]>([]);
  const [chatSenderInfo, setChatSenderInfo] = useState({
    animalFace: '',
    companyName: '',
    job: '',
    nickname: '',
    ownMemberId: undefined,
  });
  const [pageNumber, setPageNumber] = useState(1); // 현재 페이지 번호
  const [chat, setChat] = useState('');
  const [loadingMore, setLoadingMore] = useState(false);
  const accessToken = localStorage.getItem('ACCESS_TOKEN');

  useEffect(() => {
    getChatData();
  }, [chatRoomId]);

  useEffect(() => {
    console.log(chatData);
  }, [chatData]);

  useEffect(() => {
    if ('WebSocket' in window) {
      const stompClient = new Client({
        brokerURL: `${import.meta.env.VITE_WSS_URL}/stomp/websocket`,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        debug: (str) => {
          console.log(str, 'debug');
        },
        onConnect: () => {
          console.log('Connected');
          setupSubscription(stompClient);
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body);
        },
      });

      stompClient.activate();
      setStompClient(stompClient);

      return () => {
        stompClient.deactivate();
      };
    } else {
      console.error('Your browser does not support WebSocket.');
    }
  }, [chatSenderInfo]);

  const setupSubscription = (stompClient: Client) => {
    stompClient.subscribe(`/topic/${chatRoomId}`, (message) => {
      const newChatMSG = JSON.parse(message.body);
      const newChat = {
        animalFace: chatSenderInfo.animalFace,
        sender: newChatMSG.sender,
        content: newChatMSG.content,
        createdAt: newChatMSG.createdAt, // 여기서 createdAt 값을 정확히 지정해야 합니다.
        isSender: chatSenderInfo.ownMemberId === newChatMSG.senderId,
      };
      setChatData((prev) => [...prev, newChat]);
    });
  };

  const getChatData = async () => {
    try {
      const { data } = await instance.get(`api/chat/room/${chatRoomId}`);
      setChatData(data.messageSlice.content);
      console.log(data);
      setChatSenderInfo({
        animalFace: data.animalFace,
        companyName: data.companyName,
        job: data.job,
        nickname: data.nickname,
        ownMemberId: data.ownMemberId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  // 스크롤 시 데이터 더 불러오기
  const fetchData = async () => {
    setLoadingMore(true);
    try {
      const { data } = await instance(
        `/api/chat/room/${chatRoomId}/?pageNumber=${pageNumber}&pageSize=${PAGESIZE}`,
      );
      console.log(data.messageSlice.content, pageNumber);
      setChatData((prev) => [...data.messageSlice.content, ...prev]);
      setPageNumber((prevPageNumber) => prevPageNumber + 1); // 페이지 번호 증가
      setLoadingMore(false);
    } catch (err) {
      console.log(err);
    }
  };

  const sendMessage = () => {
    if (stompClient && chat) {
      stompClient.publish({
        destination: '/chat/send',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
        body: JSON.stringify({
          chatRoomId: chatRoomId,
          content: chat,
        }),
      });
      setChat('');
    }
  };

  const handleSubmit = () => {
    sendMessage();
  };
  return (
    <section css={chatRoomStyles}>
      <ChatRoomHeader
        animalFace={chatSenderInfo.animalFace}
        companyName={chatSenderInfo.companyName}
        job={chatSenderInfo.job}
        nickname={chatSenderInfo.nickname}
      />
      <ChatRoomMain
        chatData={chatData}
        fetchData={fetchData}
        loadingMore={loadingMore}
      />
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
