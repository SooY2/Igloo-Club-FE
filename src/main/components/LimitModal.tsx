import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Xicon } from '../assets/svgs';

const LimitModal = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();

  const subtitle = '오늘은 이미\n 프로필을 세 번 뽑았어요';
  const completement = '새로운 인연은 내일 이 시간에 소개해 드릴게요';

  const handleClickBtn = () => {
    navigate('/main-page');
    closeModal();
  };

  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <StModalContainer onClick={handleOutsideClick}>
      <StModalWrapper>
        <StXBtn type="button" onClick={closeModal}>
          <Xicon />
        </StXBtn>
        <StModalTitle>앗!</StModalTitle>
        <StModalSubTitle>{subtitle}</StModalSubTitle>
        <StFinishBtnBox>
          <StFinishBtn type="button" onClick={handleClickBtn}>
            <StFinishMent>메인 페이지로 가기</StFinishMent>
          </StFinishBtn>
          <StCompleteMent>{completement}</StCompleteMent>
        </StFinishBtnBox>
      </StModalWrapper>
    </StModalContainer>
  );
};

export default LimitModal;

const StModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  padding-top: 5rem;
  background: rgb(0 0 0 / 50%);
  transform: translateX(-20%);
`;

const StModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 34rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const StXBtn = styled.button`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
  padding-left: 28rem;
`;

const StModalTitle = styled.span`
  display: flex;
  padding-top: 0.5rem;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.5rem;
`;

const StModalSubTitle = styled.span`
  display: flex;
  padding-top: 0.8rem;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray7};
  text-align: center;
`;

const StFinishBtnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StFinishBtn = styled.button`
  display: flex;
  flex-direction: row;
  gap: 1.1rem;
  align-items: center;
  justify-content: center;
  min-width: 29rem;
  height: 4.2rem;
  margin-top: 1.6rem;
  background: rgb(250 114 104 / 20%);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
`;

const StFinishMent = styled.span`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const StCompleteMent = styled.span`
  padding-top: 1.5rem;
  padding-bottom: 3rem;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  color: #4dca9a;
  text-align: center;
`;
