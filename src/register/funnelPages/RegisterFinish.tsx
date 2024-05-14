import styled from '@emotion/styled';
import { prefinish } from '../assets/images/0_index';
import { Kakao } from '../assets/svgs/0_index';

const 회원가입완료 = ({ onNext }: { onNext: () => void }) => {
  return (
    <>
      <StContainer>
        <StIMG>
          <StLogo src={prefinish} />
          <StText>사전 프로필 등록이 완료되었어요!</StText>
          <div>
            <StSub>
              사전 프로필 등록을 완료했어요. 봄 축제가 시작되는 16일부터
            </StSub>
            <StSub>
              이용가능해요. 봄 축제 당일에 <StBold>순차적으로 연락</StBold>
              드릴게요.
            </StSub>
            <Stbox>
              <Kakao />
              <span>문자 메시지가 도착하면 꼭 확인해 주세요</span>
            </Stbox>
          </div>
        </StIMG>
      </StContainer>
      <div css={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Button onClick={onNext}>메인으로 가기</Button>
      </div>
    </>
  );
};

export default 회원가입완료;

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

const StLogo = styled.img`
  width: 5rem;
`;

const StText = styled.p`
  color: ${({ theme }) => theme.colors.gray8};
  ${({ theme }) => theme.fonts.title};
`;

const StSub = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 2rem;
  color: #556372;
  text-align: center;
  letter-spacing: -0.3px;
`;

const StBold = styled.span`
  font-weight: 800;
`;

const Stbox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 34rem;
  height: 5.5rem;
  margin-top: 3rem;
  font-size: 1.4rem;
  font-weight: 700;
  color: #3c4651;
  text-align: center;
  letter-spacing: -0.3px;
  background: #f3f4f5;
  border-radius: 10px;
`;

const Button = styled.button`
  width: 20rem;
  min-height: 5.4rem;
  color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(90deg, #ffaa81 0%, #ff7781 51.24%, #ff6b72 100%);
  border-radius: 30px;
  ${({ theme }) => theme.fonts.body1};
`;
