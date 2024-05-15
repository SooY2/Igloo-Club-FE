import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../../common/apis/axiosInstanse';
import ChatRoomMain from './ChatRoomMain';
import ChatRoomHeader from './ChatRoomHeader';
import { css } from '@emotion/react';
import ChatRoomFooter from './ChatRoomFooter';
import { Client } from '@stomp/stompjs';
import { ChatDataTypes } from '../../types/chatDataTypes';

// const PAGESIZE = 12;

/** 채팅방 컴포넌트입니다 */
const ChatRoom = () => {
  const { chatRoomId } = useParams();
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatData, setChatData] = useState<ChatDataTypes[]>([]);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [chatSenderInfo, setChatSenderInfo] = useState({
    animalFace: '',
    companyName: '',
    job: '',
    nickname: '',
    ownMemberId: undefined,
  });
  const [chat, setChat] = useState('');
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleVisualViewportResize = () => {
      const currentVisualViewportHeight = window.visualViewport?.height;
      if (divRef.current && currentVisualViewportHeight) {
        // div의 높이를 viewport의 높이로 조정
        divRef.current.style.height = `${currentVisualViewportHeight}px`;
        setWindowHeight(currentVisualViewportHeight);
        window.scrollTo(0, 0);
      }
    };

    // visualViewport가 존재하면 이벤트 리스너 등록
    window.visualViewport?.addEventListener(
      'resize',
      handleVisualViewportResize,
    );

    // 컴포넌트 언마운트 시 이벤트 리스너 해제 및 스타일 초기화
    return () => {
      window.visualViewport?.removeEventListener(
        'resize',
        handleVisualViewportResize,
      );
      // 스타일 초기화
      document.body.style.maxHeight = '';
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    getChatData();
  }, [chatRoomId]);

  useEffect(() => {
    if ('WebSocket' in window) {
      const stompClient = new Client({
        brokerURL: `${import.meta.env.VITE_WSS_URL}/stomp/websocket`,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
        onConnect: () => {
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
      const { data } = await instance.get(
        `api/chat/room/${chatRoomId}?pageNumber=0&pageSize=100`,
      );
      setChatData(data.messageSlice.content);
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
    <div
      ref={divRef}
      css={chatRoomStyles}
      style={{ height: `${windowHeight}px` }}
    >
      <ChatRoomHeader
        animalFace={chatSenderInfo.animalFace}
        companyName={chatSenderInfo.companyName}
        job={chatSenderInfo.job}
        nickname={chatSenderInfo.nickname}
        chatRoomId={Number(chatRoomId)}
        css={HeaderBox}
      />
      <ChatRoomMain chatData={chatData} css={MainBox} />
      <ChatRoomFooter
        chat={chat}
        setChat={setChat}
        handleSubmit={handleSubmit}
        css={FooterBox}
      />
    </div>
  );
};

export default ChatRoom;

const chatRoomStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const HeaderBox = css`
  z-index: 999;
`;

const MainBox = css`
  z-index: 1;
`;

const FooterBox = css`
  z-index: 1;
`;
