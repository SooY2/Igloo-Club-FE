import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';

const FinishSendBtn = () => {
  return (
    <div css={Container}>
      <span css={SendBtn}>이미 상대방에게 눈길을 보냈어요</span>
    </div>
  );
};

export default FinishSendBtn;
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
