import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AnimalProfile from '../../common/components/AnimalProfile';
import { calculateElapsedTime } from '../../common/utils/calculateElapsedTime';
import { useNavigate } from 'react-router';

interface ChatRoomProps {
  animalFace: string;
  senderNickName: string;
  content: string;
  createdAt: string;
  chatRoomId: number;
}

const ChatRoomBox = ({
  animalFace,
  senderNickName,
  content,
  createdAt,
  chatRoomId,
}: ChatRoomProps) => {
  const navigate = useNavigate();

  return (
    <article
      css={containerStyles}
      onClick={() => {
        navigate(`./${chatRoomId}`);
      }}
    >
      <AnimalProfile animalFace={animalFace} />
      <span css={contentStyles}>
        <StUserName>{senderNickName}</StUserName>
        <StContent>{content}</StContent>
      </span>
      <span css={timeStyles}>
        <StTime>{calculateElapsedTime(createdAt)}</StTime>
      </span>
    </article>
  );
};

export default ChatRoomBox;

const containerStyles = css`
  display: flex;
  gap: 1.2rem;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
`;

const contentStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  justify-content: center;
  width: calc(100% - 10rem);
`;

const timeStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: end;
  width: 20%;
  padding-bottom: 0.2rem;
`;

const StUserName = styled.h2`
  ${({ theme }) => theme.fonts.body2b};
`;

const StContent = styled.h3`
  width: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.colors.gray6};
  ${({ theme }) => theme.fonts.body3};

  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StTime = styled.div`
  color: ${({ theme }) => theme.colors.gray5};
  ${({ theme }) => theme.fonts.body3};
`;
