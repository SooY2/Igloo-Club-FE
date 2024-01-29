import styled from '@emotion/styled';

interface RegisterBtnProps {
  isActive: boolean;
  onClick: () => void;
  content: string;
}

const RegisterBtn = ({ isActive, onClick, content }: RegisterBtnProps) => {
  return (
    <Button isActive={isActive} disabled={!isActive} onClick={onClick}>
      {content}
    </Button>
  );
};

export default RegisterBtn;

const Button = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 5.4rem;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.gray5};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.gray2};
  border-radius: 15px;
  ${({ theme }) => theme.fonts.body1};
`;
