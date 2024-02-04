import { css } from '@emotion/react';
import { theme } from '../styles/theme';
import { ArrowLeft } from '../../main/assets/svgs';

const ArrowLeftNav = () => {
  return (
    <div css={Container}>
      <ArrowLeft />
    </div>
  );
};

export default ArrowLeftNav;

const Container = css`
  width: 100%;
  padding-top: 2.5rem;
  padding-left: 2.1rem;
  background: ${theme.colors.white};
`;
