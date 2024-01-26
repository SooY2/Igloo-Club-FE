import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const TitleBox = styled.h1`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.subtitle1};
`;

export const articleStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

export const Button = styled.button<{ isActive: boolean }>`
  width: 100%;
  height: 5.4rem;
  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.white : theme.colors.gray5};
  background-color: ${({ theme, isActive }) =>
    isActive ? theme.colors.primary : theme.colors.gray2};
  border-radius: 15px;
`;
