import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ChangeEvent } from 'react';

interface RadioProps {
  name: string;
  value1: string;
  value2: string;
  onRadioChange: (value: string) => void; //부모에 선택된 input 태그를 event 째로 넘겨줌
}

const Radio = ({ name, value1, value2, onRadioChange }: RadioProps) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    onRadioChange(event.target.value);
  };
  return (
    <div css={checkRadioContainerStyles}>
      <label>
        <StRadioInput
          type="radio"
          name={name}
          value={value1}
          onChange={handleRadioChange}
        />
        <StRadioSpan>{value1}</StRadioSpan>
      </label>
      <label>
        <StRadioInput
          type="radio"
          name={name}
          value={value2}
          onChange={handleRadioChange}
        />
        <StRadioSpan>{value2}</StRadioSpan>
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

export const StRadioInput = styled.input`
  display: none;
`;

export const StRadioSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
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
