import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { MatchDatatypes } from '../types/MatchDatatypes';
import { theme } from '../../common/styles/theme';
import { Chat } from '../assets/svgs/index';

interface StartChatBtnProps {
  matchData: MatchDatatypes | undefined;
}

const StartChatBtn = ({ matchData }: StartChatBtnProps) => {
  const navigate = useNavigate();

  const handleClickBtn = () => {
    navigate(`/chat/${matchData?.chatRoomId}`);
  };

  return (
    <div css={Container}>
      <button type="button" onClick={handleClickBtn} css={StartBtn}>
        <Chat />
        지금 대화를 시작해보세요
      </button>
    </div>
  );
};

export default StartChatBtn;

const Container = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 9rem;
  padding: 0 2.2rem;
  background: ${theme.colors.white};
  border-top: 1px solid #e3e3e3;
`;

const StartBtn = css`
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.5rem;
  padding: 1.5rem 8rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${theme.colors.white};
  text-align: center;
  background-color: ${theme.colors.primary};
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`;
