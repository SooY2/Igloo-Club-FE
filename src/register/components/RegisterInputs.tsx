import * as St from '../styles/registerInputStyles';

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
