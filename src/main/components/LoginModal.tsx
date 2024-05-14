import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Xicon } from '../assets/svgs';

const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
  const navigate = useNavigate();

  const handleClickBtn = () => {
    navigate('/login');
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
        <StModalTitle>잠깐만요!</StModalTitle>
        <StModalSubTitle>지금 눈길에 로그인하면</StModalSubTitle>
        <StModalSubTitle>등록된 모든 프로필을 볼 수 있어요</StModalSubTitle>
        <StFinishBtnBox>
          <StFinishBtn type="button" onClick={handleClickBtn}>
            <StFinishMent>로그인 하고 상세 프로필 구경하기</StFinishMent>
          </StFinishBtn>
        </StFinishBtnBox>
      </StModalWrapper>
    </StModalContainer>
  );
};

export default LoginModal;

const StModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 50%);
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
  padding-bottom: 0.5rem;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.5rem;
`;

const StModalSubTitle = styled.span`
  display: flex;
  padding-top: 0.8rem;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray7};
  text-align: center;
`;

const StFinishBtnBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
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

// const StCompleteMent = styled.span`
//   padding-top: 1.5rem;
//   padding-bottom: 3rem;
//   font-size: 1.3rem;
//   font-style: normal;
//   font-weight: 500;
//   line-height: normal;
//   color: #4dca9a;
//   text-align: center;
// `;
