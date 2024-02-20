import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AnimalProfile from '../../common/components/AnimalProfile';

interface ChatRoomHeaderProps {
  animalFace: string;
  description: string;
  job: string;
  nickname: string;
}

const MyProfileCard = ({
  animalFace,
  job,
  nickname,
  description,
}: ChatRoomHeaderProps) => {
  return (
    <StHeader>
      <span css={senderInfoStyles}>
        <AnimalProfile animalFace={animalFace} />
        <div css={senderProfileStyles}>
          <StSenderName>{nickname}</StSenderName>
          <StSenderJob>{job}</StSenderJob>
        </div>
      </span>
      <StDescription>{description}</StDescription>
    </StHeader>
  );
};

export default MyProfileCard;

const StHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  min-width: 30rem;
  padding: 2.4rem 2.3rem 2.9rem;
  margin: 2rem 2.3rem 0;
  color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(116deg, #ff6264 0%, #ffa490 96.79%);
  border-radius: 15px;
  box-shadow:
    0 8px 16px 0 rgb(0 0 0 / 8%),
    0 0 4px 0 rgb(0 0 0 / 4%);
  ${({ theme }) => theme.fonts.body2b};
`;

const senderInfoStyles = css`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding-bottom: 1rem;
`;

const senderProfileStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StSenderName = styled.h1`
  color: ${({ theme }) => theme.colors.gray0};
  ${({ theme }) => theme.fonts.body1m};
`;

const StSenderJob = styled.p`
  color: ${({ theme }) => theme.colors.gray3};
  ${({ theme }) => theme.fonts.body3m};
`;

const StDescription = styled.div`
  color: ${({ theme }) => theme.colors.white};
  ${({ theme }) => theme.fonts.body1r};
`;
