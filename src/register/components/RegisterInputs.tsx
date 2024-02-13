import styled from '@emotion/styled';
import * as St from '../styles/registerInputStyles';
import { ArrowRight } from '../assets/svgs/0_index';
import { css } from '@emotion/react';

interface RegisterBasicInputProps {
  label: string;
  explain?: string;
  children: React.ReactNode;
}

export const RegisterBasicInput = ({
  label,
  explain,
  children,
}: RegisterBasicInputProps) => {
  return (
    <St.StLabel>
      {label}
      {children}
      <St.StBasicInputExplain>{explain}</St.StBasicInputExplain>
    </St.StLabel>
  );
};

interface RegisterArrowInputProps extends RegisterBasicInputProps {
  label: string;
  explain?: string;
  children: React.ReactNode;
  onClick: () => void;
}

export const RegisterArrowInput = ({
  label,
  explain,
  children,
  onClick,
}: RegisterArrowInputProps) => {
  return (
    <St.StLabel onClick={onClick}>
      {label}
      <div css={companyNameStyles}>
        {children}
        <StArrowRight />
      </div>
      <St.StBasicInputExplain>{explain}</St.StBasicInputExplain>
    </St.StLabel>
  );
};

const companyNameStyles = css`
  position: relative;
  width: 100%;
`;

const StArrowRight = styled(ArrowRight)`
  position: absolute;
  top: 0;
  right: 0.7rem;
`;
