import styled from '@emotion/styled';

export const StLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  ${({ theme }) => theme.fonts.body1r};
`;

export const StBasicInput = styled.input`
  width: 100%;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray1};
  ${({ theme }) => theme.fonts.body2r};

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray3};
  }
`;

export const StBasicBox = styled.div`
  width: 100%;
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

export const StErrorExplain = styled.p`
  color: ${({ theme }) => theme.colors.warning_red};
  ${({ theme }) => theme.fonts.body3};
`;
