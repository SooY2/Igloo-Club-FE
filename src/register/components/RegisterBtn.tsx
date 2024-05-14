import styled from '@emotion/styled';

interface RegisterBtnProps {
  subContent?: string;
  isActive: boolean;
  onClick: () => void;
  content: string;
}

const RegisterBtn = ({
  isActive,
  onClick,
  content,
  subContent,
}: RegisterBtnProps) => {
  return (
    <Container>
      <p>{subContent}</p>
      <Button isActive={isActive} disabled={!isActive} onClick={onClick}>
        {content}
      </Button>
    </Container>
  );
};

export default RegisterBtn;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  & > p {
    font-size: 1.2rem;
    font-style: normal;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray6};
    letter-spacing: -0.3px;
  }
`;

const Button = styled.button<{ isActive: boolean }>`
  position: relative;
  width: 100%;
  min-height: 5.4rem;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.gray5};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.gray2};
  border-radius: 15px;
  ${({ theme }) => theme.fonts.body1};
`;
