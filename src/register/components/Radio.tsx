import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

interface RadioProps {
  name: string;
  value1: string;
  value2: string;
  label1?: string;
  label2?: string;
  onRadioChange?: (value: string, name?: string) => void;
  column?: boolean;
  checkedValue: string;
}

const Radio = ({
  name,
  value1,
  value2,
  onRadioChange,
  column,
  label1,
  label2,
  checkedValue,
}: RadioProps) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    onRadioChange?.(event.target.value, name);
  };
  return (
    <div css={column ? checkRadioColumnStyles : checkRadioContainerStyles}>
      <label>
        <StRadioInput
          type="radio"
          name={name}
          value={value1}
          onChange={handleRadioChange}
          checked={checkedValue === value1}
        />
        <StRadioSpan>{label1 ? label1 : value1}</StRadioSpan>
      </label>
      <label>
        <StRadioInput
          type="radio"
          name={name}
          value={value2}
          onChange={handleRadioChange}
          checked={checkedValue === value2}
        />
        <StRadioSpan>{label2 ? label2 : value2}</StRadioSpan>
      </label>
    </div>
  );
};

export default Radio;

const checkRadioContainerStyles = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const checkRadioColumnStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
`;

export const StRadioInput = styled.input`
  display: none;
`;

export const StRadioSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 4.5rem;
  padding: 1rem 1.7rem;
  border: 1px solid ${({ theme }) => theme.colors.gray3};
  border-radius: 30px;

  ${({ theme }) => theme.fonts.body2r};

  ${StRadioInput}:checked + & {
    color: ${({ theme }) => theme.colors.white};
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
