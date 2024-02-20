import styled from '@emotion/styled';
import { Lock } from '../assets/svgs/index';

const ComingSoon = () => {
  const title = 'Coming Soon';
  const content = '곧 판교에서도 눈길을 주고 받을 수 있어요!';

  return (
    <StNotiContainer>
      <Lock />
      <StNotiTitle>{title}</StNotiTitle>
      <StNotiContent>{content}</StNotiContent>
    </StNotiContainer>
  );
};

export default ComingSoon;

const StNotiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10rem;
`;

const StNotiTitle = styled.span`
  padding-top: 1.5rem;
  font-size: 2rem;
  font-style: normal;
  font-weight: 600;
  line-height: 2.3rem;
  color: ${({ theme }) => theme.colors.gray5};
  text-align: center;
`;

const StNotiContent = styled.span`
  padding-top: 1.3rem;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray5};
  text-align: center;
`;
