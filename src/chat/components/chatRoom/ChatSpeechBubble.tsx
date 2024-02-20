import styled from '@emotion/styled';

import AnimalProfile from '../../../common/components/AnimalProfile';
import { ChatDataTypes } from '../../types/chatDataTypes';
import { formatAMPM } from '../../../common/utils/formatAmPm';

const ChatSpeechBubble = ({ chatData }: { chatData: ChatDataTypes }) => {
  const { animalFace, content, isSender, createdAt } = chatData;
  return (
    <StBubbleContainer isSender={isSender} createdAt={createdAt}>
      {!isSender && <AnimalProfile animalFace={animalFace} />}
      <StBubble isSender={isSender}>{content}</StBubble>
    </StBubbleContainer>
  );
};

export default ChatSpeechBubble;

const StBubbleContainer = styled.div<{
  isSender: boolean;
  createdAt: string;
}>`
  position: relative;
  display: flex;
  gap: 0.5rem;
  align-items: end;
  align-self: ${({ isSender }) => (isSender ? 'end' : 'first')};

  ${({ isSender, createdAt, theme }) =>
    isSender
      ? `
    &:before {
      content: "${formatAMPM(createdAt)}";
      color: ${theme.colors.gray6};
      ${theme.fonts.caption};
    }
  `
      : `
    &:after {
      content: "${formatAMPM(createdAt)}";
      color: ${theme.colors.gray6};
      ${theme.fonts.caption};
    }
  `};
`;

const StBubble = styled.div<{ isSender: boolean }>`
  width: fit-content;
  max-width: 25rem;
  padding: 1.2rem;
  margin-left: ${({ isSender }) => (isSender ? '0' : '0.7rem')};
  color: ${({ theme, isSender }) =>
    isSender ? theme.colors.white : theme.colors.black};
  background-color: ${({ theme, isSender }) =>
    isSender ? theme.colors.primary : '#F2F2F2'};
  border-radius: 17px;

  ${({ theme }) => theme.fonts.body1r};
`;
