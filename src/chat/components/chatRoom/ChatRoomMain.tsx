import { css } from '@emotion/react';
import { ChatDataTypes } from '../../types/chatDataTypes';
import ChatSpeechBubble from './ChatSpeechBubble';
import { useEffect, useRef } from 'react';

const ChatRoomMain = ({ chatData }: { chatData: ChatDataTypes[] }) => {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
    }
  }, [chatData]);

  return (
    <main
      ref={mainRef}
      css={{
        overflow: 'scroll',
        margin: '14rem 0 0',
        backgroundColor: '#fff',
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
          <div />
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
