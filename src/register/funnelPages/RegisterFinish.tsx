import { logo } from '../../common/assets/images/0_index';
import styled from '@emotion/styled';
import { NavTypesProps } from '../types/navTypes';
import { ArrowLeft } from '../assets/svgs/0_index';

const 회원가입완료 = ({ onPrev, onNext }: NavTypesProps) => {
  return (
    <>
      <CustomArrowLeft onClick={onPrev} />
      <StContainer>
        <StIMG>
          <StLogo src={logo} />
          <StText>회원가입이 완료되었어요!</StText>
        </StIMG>
      </StContainer>
      <div css={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Button onClick={onNext}>오늘의 인연 만나러가기</Button>
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
  height: 80%;
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

const CustomArrowLeft = styled(ArrowLeft)`
  left: 0;
  margin-bottom: 2.5rem;
`;

const StLogo = styled.img`
  width: 10rem;
`;

const StText = styled.p`
  color: ${({ theme }) => theme.colors.gray8};
  ${({ theme }) => theme.fonts.title};
`;

const Button = styled.button`
  width: 20rem;
  min-height: 5.4rem;
  color: ${({ theme }) => theme.colors.white};
  background: linear-gradient(90deg, #ffaa81 0%, #ff7781 51.24%, #ff6b72 100%);
  border-radius: 30px;
  ${({ theme }) => theme.fonts.body1};
`;
