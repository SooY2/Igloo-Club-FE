import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const ChatComponent = () => {
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const accessToken = localStorage.getItem('ACCESS_TOKEN'); // 토큰 가져오기

  // 웹소켓 연결 설정 및 활성화
  useEffect(() => {
    if ('WebSocket' in window) {
      const stompClient = new Client({
        // 서버의 웹소켓 엔드포인트 URL을 지정합니다.
        brokerURL: `${import.meta.env.VITE_WSS_URL}/stomp/websocket`,
        connectHeaders: {
          Authorization: `Bearer ${accessToken}`, // 토큰을 헤더에 추가
        },
        debug: (str) => {
          console.log(str); // 디버그 메시지 출력
        },
        onConnect: () => {
          console.log('Connected'); // 연결 성공 시 콘솔에 메시지 출력
          stompClient.subscribe('/topic/2', (message) => {
            setMessages((prev) => [...prev, message.body]); // 메시지 구독
          });
        },
        onStompError: (frame) => {
          console.error('Broker reported error: ' + frame.headers['message']);
          console.error('Additional details: ' + frame.body); // 에러 메시지 출력
        },
      });

      stompClient.activate(); // STOMP 클라이언트 활성화
      setStompClient(stompClient); // 상태에 STOMP 클라이언트 설정
    } else {
      console.error('Your browser does not support WebSocket.'); // 웹소켓 미지원 시 에러 메시지 출력
    }

    // 컴포넌트 언마운트 시 연결 해제
    return () => {
      if (stompClient) {
        stompClient.deactivate(); // STOMP 클라이언트 비활성화
      }
    };
  }, []);

  // 메시지 전송 함수
  const sendMessage = () => {
    if (stompClient && newMessage) {
      stompClient.publish({
        destination: '/chat/send',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
        },
        body: JSON.stringify({
          chatRoomId: 2,
          content: newMessage,
        }),
      });
      console.log(newMessage);
      setNewMessage('');
    }
  };

  // 메시지 전송 폼 및 메시지 목록 렌더링
  return (
    <div>
      <h2>Chat Messages</h2>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li> // 메시지 목록 렌더링
        ))}
      </ul>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatComponent;
