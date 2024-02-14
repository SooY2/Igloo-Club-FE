import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import AnimalProfile from '../../../common/components/AnimalProfile';
import InfoModal from '../InfoModal';
import { ArrowLeft } from '../../../main/assets/svgs';
import { Noti } from '../../assets/svgs/0_index';
import { useNavigate } from 'react-router';

interface ChatRoomHeaderProps {
  animalFace: string;
  companyName: string;
  job: string;
  nickname: string;
  chatRoomId: number;
}

const ChatRoomHeader = ({
  animalFace,
  companyName,
  job,
  nickname,
  chatRoomId,
}: ChatRoomHeaderProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const handleClickModal = () => {
    setIsModalOpen(true);
  };
  return (
    <StHeaderContainer>
      <header css={HeaderWrapper}>
        <ArrowLeft onClick={() => navigate('/chat')} />
        <span css={senderInfoStyles}>
          <AnimalProfile animalFace={animalFace} />
          <div css={senderProfileStyles}>
            <StSenderName>{nickname}</StSenderName>
            <StSenderJob>
              {companyName},{job}
            </StSenderJob>
          </div>
        </span>
      </header>
      <StChatModalWrapper onClick={handleClickModal}>
        <Noti />
        {nickname} 님과 만날 수 있는 시간과 장소를 알려드려요
      </StChatModalWrapper>
      {isModalOpen && (
        <InfoModal
          nickname={nickname}
          chatRoomId={chatRoomId}
          closeModal={() => setIsModalOpen(false)}
          css={ModalBox}
        />
      )}
    </StHeaderContainer>
  );
};

export default ChatRoomHeader;

const StHeaderContainer = styled.header`
  position: fixed;
  top: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: start;
  justify-content: center;
  width: 100%;
  padding: 3rem 2rem;
`;

const HeaderWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
  justify-content: start;
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

const StChatModalWrapper = styled.button`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 5rem;
  padding: 0 1rem;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray8};
  text-align: center;
  background: #fcf3e2;
  border-radius: 10px;
`;

const ModalBox = css`
  position: fixed;
  top: 0;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;
