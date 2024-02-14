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
      {children ? (
        <StRadioChild>{children}</StRadioChild>
      ) : (
        <StRadioSpan>{label}</StRadioSpan>
      )}
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

const StRadioChild = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 8.2rem;
  padding: 2rem;
  background-color: ${({ theme }) => theme.colors.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray0};
  border-radius: 15px;

  ${StRadioInput}:checked + & {
    background-color: ${({ theme }) => theme.colors.alpha10_primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;
