import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AnimalProfile from '../../../common/components/AnimalProfile';
import { ArrowLeft } from '../../../main/assets/svgs';
import { useNavigate } from 'react-router';

const ChatRoomHeader = () => {
  const navigate = useNavigate();
  return (
    <header css={containerStyles}>
      <ArrowLeft onClick={() => navigate('/chat')} />
      <span css={senderInfoStyles}>
        <AnimalProfile animalFace={'강아지상'} />
        <div css={senderProfileStyles}>
          <StSenderName>숭멋사</StSenderName>
          <StSenderJob>
            {'멋쟁이사자처럼'},{'개발자'}
          </StSenderJob>
        </div>
      </span>
    </header>
  );
};

export default ChatRoomHeader;

const containerStyles = css`
  position: fixed;
  top: 0;
  display: flex;
  gap: 2.6rem;
  align-items: center;
  width: 100%;
  padding: 1rem 2rem;
`;

const senderInfoStyles = css`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const senderProfileStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const StSenderName = styled.h1`
  color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.body1};
`;

const StSenderJob = styled.p`
  color: ${({ theme }) => theme.colors.gray6};
  ${({ theme }) => theme.fonts.body3m};
`;
