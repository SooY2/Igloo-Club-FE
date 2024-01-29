import { css } from '@emotion/react';
import { Xicon } from '../common/assets/svgs/index';

const FinishMatch = () => {
  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <Xicon />
        <div css={Top.Title}></div>
      </div>
    </div>
  );
};

export default FinishMatch;

const Container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 3.6rem;
  background-color: #e0cfcf;
`;

const Top = {
  Wrapper: css`
    display: flex;
  `,

  Title: css`
    display: flex;
  `,
};
