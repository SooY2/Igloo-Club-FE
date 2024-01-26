import styled from '@emotion/styled';

export const StLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body1r};
`;

export const StBasicInput = styled.input`
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.fonts.body2r};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

export const StBasicInputExplain = styled.p`
  color: ${({ theme }) => theme.colors.gray6};
  ${({ theme }) => theme.fonts.body3};
`;
