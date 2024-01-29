import { css } from '@emotion/react';
import { ArrowLeft } from '../assets/svgs/0_index';
import styled from '@emotion/styled';

const RegisterHeader = ({
  isFirst = false,
  percent,
  onPrev,
}: {
  isFirst?: boolean;
  percent: number;
  onPrev?: () => void;
}) => {
  return (
    <header css={headerStyles}>
      <div css={navStyles}>
        {isFirst ? (
          <ExitBtn type="button">그만두기</ExitBtn>
        ) : (
          <CustomArrowLeft onClick={onPrev} />
        )}
      </div>
      <ProgressBar max={100} value={percent} />
    </header>
  );
};

export default RegisterHeader;

const headerStyles = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 5.3rem;
`;

const navStyles = css`
  position: relative;
  margin-top: 2.5rem;
`;

const CustomArrowLeft = styled(ArrowLeft)`
  position: absolute;
  left: 0;
  margin-bottom: 2.5rem;
`;

const ExitBtn = styled.button`
  position: absolute;
  right: 0.3rem;
  margin-bottom: 2.5rem;
  color: ${({ theme }) => theme.colors.gray5};
`;

const ProgressBar = styled.progress`
  width: 100%;
  height: 0.25rem;
  margin-top: 4.1rem;
  appearance: none;

  &::-webkit-progress-bar {
    background: ${({ theme }) => theme.colors.gray1};
  }

  &::-webkit-progress-value {
    background: ${({ theme }) => theme.colors.primary};
  }
`;
