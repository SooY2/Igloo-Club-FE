import { css } from '@emotion/react';
import { ChatDataTypes } from '../../types/chatDataTypes';
import ChatSpeechBubble from './ChatSpeechBubble';
import { useEffect, useRef, useState } from 'react';

const ChatRoomMain = ({ chatData }: { chatData: ChatDataTypes[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [chatData]);

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main
      ref={mainRef}
      css={{
        overflow: 'scroll',
        margin: '14rem 0 0',
        backgroundColor: '#fff',
        height: `calc(${windowHeight} - 22.5rem)`,
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
