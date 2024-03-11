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

export const SubTitle = styled.p`
  color: ${({ theme }) => theme.colors.gray7};
  ${({ theme }) => theme.fonts.body2r};
`;

export const articleStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
`;

export const sectionStyles = css`
  display: flex;
  flex-direction: column;
`;

export const StBtnExplain = styled.p`
  color: ${({ theme }) => theme.colors.gray6};
  ${({ theme }) => theme.fonts.body3};
`;

export const StBasicTextArea = styled.textarea`
  width: 100%;
  height: 26.9rem;
  padding: 1.9rem 1.8rem;
  word-break: break-all;
  resize: none;
  background-color: #fafafa;
  border-radius: 5px;

  ${({ theme }) => theme.fonts.body2r};

  &::placeholder {
    line-height: 2rem;
    color: ${({ theme }) => theme.colors.gray5};
    ${({ theme }) => theme.fonts.body2r};
  }
`;

export const StBasicTextCnt = styled.p`
  align-self: flex-end;
  color: ${({ theme }) => theme.colors.gray7};
  ${({ theme }) => theme.fonts.body3};
`;

export const checkBoxContainerStyles = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 3.2rem;
`;
