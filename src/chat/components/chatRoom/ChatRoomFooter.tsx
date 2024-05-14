import styled from '@emotion/styled';
import { ChatSubmit, ChatSubmitActive } from '../../assets/svgs/0_index';
import { Dispatch, SetStateAction, useRef } from 'react';

const ChatRoomFooter = ({
  chat,
  setChat,
  handleSubmit,
}: {
  chat: string;
  setChat: Dispatch<SetStateAction<string>>;
  handleSubmit: () => void;
}) => {
  const ref = useRef<HTMLTextAreaElement>(null);

  return (
    <StContainer>
      <StTextarea
        ref={ref}
        placeholder="메시지 보내기"
        value={chat}
        onChange={(e) => {
          setChat(e.target.value);
        }}
      />
      <StChatSubmit
        onClick={(e) => {
          e.preventDefault();
          handleSubmit();
          ref?.current?.focus();
        }}
      >
        {chat ? <ChatSubmitActive /> : <ChatSubmit />}
      </StChatSubmit>
    </StContainer>
  );
};

export default ChatRoomFooter;

const StContainer = styled.footer`
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 42.5rem;
  padding: 1rem 2rem 2.3rem;
  background-color: #fff;
`;

const StTextarea = styled.textarea`
  width: 100%;
  max-width: 42.5rem;
  height: 4rem;
  padding: 1rem 1.7rem;
  text-justify: center;
  word-wrap: break-word;
  resize: none;
  background-color: #f2f3f5;
  border-radius: 27px;
  ${({ theme }) => theme.fonts.body1m};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray5};
    ${({ theme }) => theme.fonts.body1m};
  }
`;

const StChatSubmit = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
`;
