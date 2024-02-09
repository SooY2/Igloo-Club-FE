import { css } from '@emotion/react';
import { ChatDataTypes } from '../../types/chatDataTypes';
import ChatSpeechBubble from './ChatSpeechBubble';
import { useEffect, useRef } from 'react';

const ChatRoomMain = ({
  chatData,
  fetchData,
}: {
  chatData: ChatDataTypes[];
  fetchData: () => void;
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 스크롤을 맨 아래로 내리는 함수
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 메시지 목록이 변경될 때마다 스크롤을 맨 아래로 내림
  useEffect(() => {
    scrollToBottom();
    const options = {
      root: null, // 뷰포트를 root로 사용
      rootMargin: '0px',
      threshold: 1.0, // 타겟이 완전히 보일 때 콜백 실행
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchData();
      }
    }, options);

    // if (loader.current) {
    //   observer.observe(loader.current);
    // }

    // 클린업 함수
    return () => observer.disconnect();
  }, [chatData]);

  return (
    <main
      css={{
        overflow: 'scroll',
        height: 'calc(100vh - 16rem)',
        marginTop: '6.8rem',
      }}
    >
      {chatData ? (
        <>
          <div css={containerStyles}>
            {chatData.map((item, idx) => {
              return (
                <ChatSpeechBubble
                  key={item.isSender + item.createdAt + idx}
                  chatData={item}
                />
              );
            })}
          </div>
          <div ref={messagesEndRef} />
        </>
      ) : (
        <></>
      )}
    </main>
  );
};

export default ChatRoomMain;

const containerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: end;
  width: 100%;

  /* height: calc(100vh - 16rem); */
  padding: 0 2.4rem;
`;
