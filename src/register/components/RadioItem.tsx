import styled from '@emotion/styled';
import { ChangeEvent } from 'react';

interface RadioItemProps {
  name: string;
  value: string;
  onRadioChange: (value: string) => void;
}

const RadioItem = ({ value, name, onRadioChange }: RadioItemProps) => {
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    onRadioChange(event.target.value);
  };
  return (
    <StCompanyLabel>
      <StRadioInput
        type="radio"
        name={name}
        value={value}
        onChange={handleRadioChange}
      />
      <StRadioSpan>{value}</StRadioSpan>
    </StCompanyLabel>
  );
};

export default RadioItem;

const StCompanyLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StRadioInput = styled.input`
  display: none;
`;

const StRadioSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: 3.7rem;
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
