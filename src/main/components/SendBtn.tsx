import { useState } from 'react';
import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { theme } from '../../common/styles/theme';
import { Lightning } from '../assets/svgs/index';
import SendNungilModal from './SendNungilModal';

const SendNungilBtn = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { state } = useLocation();

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div css={Container}>
      <button type="button" onClick={handleClick} css={SendBtn}>
        <Lightning />
        눈길 보내기
      </button>
      {isModalOpen && (
        <SendNungilModal
          nungilId={state.nungilId}
          nickname={state.nickname}
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
  height: 9rem;
  padding: 0 2.2rem;
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
