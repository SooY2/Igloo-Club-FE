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
  chatRoomId: number | undefined;
}

const ChatRoomHeader = ({
  animalFace,
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
            <StSenderJob>{job}</StSenderJob>
          </div>
        </span>
      </header>
      <StChatModalWrapper onClick={handleClickModal}>
        <Noti />
        <span>상대방이 선택한 만남 시간과 장소를 참고해 보세요.</span>
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
  align-items: start;
  justify-content: center;
  width: 100%;
  padding: 0 2rem;
  white-space: pre-line;
`;

const HeaderWrapper = css`
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;
  justify-content: start;
  width: 100%;
  max-width: 42.5rem;
  padding: 2.5rem 0 1.5rem;
  background: #fff;
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
  display: inline-flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 40rem;
  height: 5rem;
  padding-right: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray8};
  text-align: center;
  background: #fcf3e2;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
  }
`;

const ModalBox = css`
  z-index: 999;
`;
