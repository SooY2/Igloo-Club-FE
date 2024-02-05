import styled from '@emotion/styled';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface CheckBoxItemProps {
  name: string;
  value: string;
  children?: React.ReactNode;
  setValues: Dispatch<SetStateAction<string[]>>;
  label?: string;
  values: string[];
}

const CheckBoxItem = ({
  name,
  value,
  children,
  setValues,
  label,
  values,
}: CheckBoxItemProps) => {
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setValues((prevValues) =>
      values.includes(value)
        ? prevValues.filter((val) => val !== value)
        : [...prevValues, value],
    );
  };

  return (
    <StCompanyLabel>
      <StRadioInput
        type="checkbox"
        name={name}
        value={value}
        onChange={handleCheckboxChange}
        checked={values.includes(value)}
      />
      <StRadioSpan>{children ? children : label}</StRadioSpan>
    </StCompanyLabel>
  );
};

export default CheckBoxItem;

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
