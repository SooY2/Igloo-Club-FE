import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Lock } from '../assets/svgs/index';

const NowMatching = () => {
  const navigate = useNavigate();
  const title = '내일 만날 수 있는 인연은\n 오후 3시부터 소개됩니다.';
  const content =
    '지금은 오늘의 매칭 인연들이 데이트를 하는 시간이에요.\n 오후 3시부터 내일 만날 수 있는 인연을 소개해 드려요.';

  const ClickEditBtn = () => {
    navigate('/editprofilepage');
  };

  return (
    <StNotiContainer>
      <Lock />
      <StNotiTitle>{title}</StNotiTitle>
      <StNotiContent>{content}</StNotiContent>
      <StEditProfile type="button" onClick={ClickEditBtn}>
        내 프로필 수정하기
      </StEditProfile>
    </StNotiContainer>
  );
};

export default NowMatching;

const StNotiContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10rem;
`;

const StNotiTitle = styled.span`
  padding-top: 1.7rem;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 2.3rem;
  color: ${({ theme }) => theme.colors.gray5};
  text-align: center;
`;

const StNotiContent = styled.span`
  padding-top: 1rem;
  padding-bottom: 1.3rem;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 2rem;
  color: ${({ theme }) => theme.colors.gray5};
  text-align: center;
`;

const StEditProfile = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-width: 13.3rem;
  height: 3.5rem;
  padding: 0.9rem 1.8rem;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  text-align: center;
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 50px;

  &:hover {
    cursor: pointer;
  }
`;
