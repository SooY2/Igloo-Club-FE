import styled from '@emotion/styled';

import AnimalProfile from '../../../common/components/AnimalProfile';
import { ChatDataTypes } from '../../types/chatDataTypes';

const ChatSpeechBubble = ({ chatData }: { chatData: ChatDataTypes }) => {
  console.log(chatData);
  const { animalFace, content, isSender } = chatData;
  return (
    <StBubble isSender={isSender}>
      <AnimalProfile animalFace={animalFace} />
      {content}
    </StBubble>
  );
};

export default ChatSpeechBubble;

const StBubble = styled.div<{ isSender: boolean }>`
  align-self: ${({ isSender }) => (isSender ? 'first' : 'end')};
  width: fit-content;
  max-width: 25rem;
  padding: 1.2rem;
  color: ${({ theme, isSender }) =>
    isSender ? theme.colors.black : theme.colors.white};
  background-color: ${({ theme, isSender }) =>
    isSender ? '#F2F2F2' : theme.colors.primary};
  border-radius: 17px;

  ${({ theme }) => theme.fonts.body1r};
`;
