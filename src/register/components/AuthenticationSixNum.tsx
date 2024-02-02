import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from 'react';

interface InputFieldProps {
  index: number;
  onInputChange: (event: ChangeEvent<HTMLInputElement>, index: number) => void;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ onInputChange, index }, ref) => {
    const [value, setValue] = useState('');
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value.slice(0, 1));
      onInputChange(event, index);
    };

    return (
      <StInput
        ref={ref}
        type="number"
        maxLength={1}
        onChange={handleChange}
        value={value}
      />
    );
  },
);

InputField.displayName = 'InputField';

const StInput = styled.input`
  width: 3.6rem;
  font-size: 2.8rem;
  font-weight: 600;
  text-align: center;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray3};
`;

const AuthenticationSixNum = ({
  setAuthentication,
}: {
  setAuthentication: Dispatch<SetStateAction<string>>;
}) => {
  const totalInputs = 6;
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current = Array(totalInputs).fill(null);
  }, []);

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    setAuthentication((prev) =>
      prev ? prev + event.target.value : event.target.value,
    );

    if (event.target.value && index < totalInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    if (event.target.value.length === 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div css={inputBoxStyles}>
      {Array.from({ length: totalInputs }).map((_, index) => (
        <InputField
          key={index}
          index={index}
          ref={(el) => (inputRefs.current[index] = el)}
          onInputChange={handleInputChange}
        />
      ))}
    </div>
  );
};

export default AuthenticationSixNum;

const inputBoxStyles = css`
  display: flex;
  gap: 1.5rem;
`;
