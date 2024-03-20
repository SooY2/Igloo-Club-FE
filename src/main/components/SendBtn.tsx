import { useState } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import CountDown from './CountDown';
import { Lightning } from '../assets/svgs/index';
import SendNungilModal from './SendNungilModal';

const SendNungilBtn = ({
  nungilId,
  nickname,
}: {
  nungilId: number;
  nickname: string;
}) => {
  const [isSent, setIsSent] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div css={Container}>
      {isSent ? (
        <button type="button" css={FinishBtn}>
          이미 상대방에게 눈길을 보냈어요
        </button>
      ) : (
        <button type="button" onClick={handleClick} css={SendBtn}>
          <Lightning />
          <CountDown />
          안에 눈길 보내기
        </button>
      )}
      {isModalOpen && (
        <SendNungilModal
          nungilId={nungilId}
          nickname={nickname}
          successApi={() => setIsSent(true)}
          closeModal={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SendNungilBtn;

const Container = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 42.5rem;
  height: 9rem;
  padding: 0 2rem;
  background: ${theme.colors.white};
  border-top: 1px solid #e3e3e3;
`;

const SendBtn = css`
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.5rem;
  padding: 1.5rem 10rem;
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

const FinishBtn = css`
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.5rem;
  padding: 1.5rem 7rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #b7bcc5;
  text-align: center;
  background-color: #e8e9ef;
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`;
