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
      const val = event.target.value.toUpperCase();

      if (val.match(/^[A-Z0-9]$/) || val === '') {
        setValue(val);
        onInputChange(event, index);
      }
    };

    return (
      <StInput
        ref={ref}
        type="text"
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
  const [code, setCode] = useState(Array(totalInputs).fill(''));

  // 입력값이 변경될 때마다 호출될 함수
  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newCode = [...code];
    newCode[index] = event.target.value.slice(0, 1); // 현재 입력 필드의 값을 가져옵니다.
    setCode(newCode); // 로컬 상태를 업데이트합니다.

    // 다음 입력 필드로 포커스 이동 또는 이전 입력 필드로 포커스 이동
    if (event.target.value && index < totalInputs - 1) {
      inputRefs.current[index + 1]?.focus();
    } else if (event.target.value === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // 모든 입력 필드가 채워졌는지 확인하고, 완료되면 상태 업데이트
  useEffect(() => {
    const completedCode = code.join('');
    if (completedCode.length === totalInputs) {
      setAuthentication(completedCode);
    }
  }, [code, setAuthentication]);

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
