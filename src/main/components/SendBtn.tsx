import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import { Lightning } from '../assets/svgs/index';

const SendNungilBtn = () => {
  return (
    <div css={Container}>
      <button type="button" css={SendBtn}>
        <Lightning />
        눈길 보내기
      </button>
    </div>
  );
};

export default SendNungilBtn;

const Container = css`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 9rem;
  padding: 1.7rem 2.3rem;
  border-top: 1px solid #e3e3e3;
`;

const SendBtn = css`
  width: 38rem;
  height: 5.5rem;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  text-align: center;
  background-color: ${theme.colors.primary};
  border-radius: 10px;
`;
