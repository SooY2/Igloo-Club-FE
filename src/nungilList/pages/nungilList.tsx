import { css } from '@emotion/react';
import NavBar from '../../common/components/NavBar';

const NungilList = () => {
  return (
    <div css={Container}>
      <div css={Top.Wrapper}></div>
      <div css={Middle.Wrapper}></div>
      <div css={Bottom.Wrapper}>
        <NavBar />
      </div>
    </div>
  );
};

export default NungilList;

const Container = css`
  display: flex;
`;

const Top = {
  Wrapper: css`
    display: flex;
  `,
};

const Middle = {
  Wrapper: css`
    display: flex;
  `,
};

const Bottom = {
  Wrapper: css`
    display: flex;
  `,
};
