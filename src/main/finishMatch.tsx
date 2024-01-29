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
`;

const Top = {
  Wrapper: css`
    display: flex;
  `,

  Title: css`
    display: flex;
  `,
};
