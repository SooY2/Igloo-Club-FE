import { css } from '@emotion/react';
import { ChatDataTypes } from '../../types/chatDataTypes';
import ChatSpeechBubble from './ChatSpeechBubble';
import { useEffect, useRef } from 'react';

const ChatRoomMain = ({ chatData }: { chatData: ChatDataTypes[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  // 새 메시지가 추가되었을 때만 스크롤을 최하단으로 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chatData]);

  return (
    <main
      ref={mainRef}
      css={{
        overflow: 'scroll',
        margin: '14rem 0 0',
        backgroundColor: '#fff',
        height: 'calc(100vh - 22.5rem)',
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
  padding: 0 2.4rem;
`;
