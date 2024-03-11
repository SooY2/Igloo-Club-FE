import styled from '@emotion/styled';
import { CheckApplication } from '../../register/assets/svgs/0_index';
import { Link } from 'react-router-dom';

const 사전신청완료 = () => {
  return (
    <>
      <StContainer>
        <StIMG>
          <CheckApplication />
          <StText>사전알림 신청이 완료되었어요!</StText>
          <StExplain>
            <p>눈길은 현재 회원님들의 보다 만족스러운 만남을 위해</p>
            <p>
              준비 중이에요. 준비가 끝나는 대로{' '}
              <b css={{ fontWeight: 'bold' }}>순차적으로 연락</b>드릴게요.
            </p>
          </StExplain>
          <StMsgBox>알림 메시지가 도착하면 꼭 확인해주세요</StMsgBox>

          <StLink to="/login">메인으로 가기</StLink>
        </StIMG>
      </StContainer>
    </>
  );
};

export default 사전신청완료;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90%;
  animation: fade-in-bottom 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;

  @keyframes fade-in-bottom {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in-bottom {
    0% {
      opacity: 0;
      transform: translateY(50px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StIMG = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  justify-content: center;
`;

const StText = styled.p`
  color: ${({ theme }) => theme.colors.gray8};
  ${({ theme }) => theme.fonts.title};
`;

const StExplain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray7};
  ${({ theme }) => theme.fonts.body2m};
`;

const StMsgBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.4rem;
  color: ${({ theme }) => theme.colors.gray8};
  background-color: ${({ theme }) => theme.colors.gray0};
  border-radius: 10px;
  ${({ theme }) => theme.fonts.body2b};
`;

const StLink = styled(Link)`
  color: ${({ theme }) => theme.colors.gray6};
  ${({ theme }) => theme.fonts.body2b};
`;
