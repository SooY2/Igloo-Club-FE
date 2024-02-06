import { css } from '@emotion/react';
import { ChatDataTypes } from '../../types/chatDataTypes';
import ChatSpeechBubble from './ChatSpeechBubble';

const ChatRoomMain = ({ chatData }: { chatData: ChatDataTypes[] }) => {
  return (
    <main css={containerStyles}>
      {chatData ? (
        <>
          {chatData.map((item, idx) => {
            return (
              <ChatSpeechBubble
                key={item.isSender + item.createdAt + idx}
                chatData={item}
              />
            );
          })}
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
  height: calc(100vh - 15rem);
  padding: 0 2.4rem;
  margin-top: 6.8rem;
`;
