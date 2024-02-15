import { css } from '@emotion/react';
import emotionReset from 'emotion-reset';

const globalStyles = css`
  ${emotionReset};

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */

    &::-webkit-scrollbar {
      display: none;
    }
  }

  html {
    font-size: 62.5%;
  }

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-family:
      'Pretendard Variable',
      Pretendard,
      -apple-system,
      BlinkMacSystemFont,
      system-ui,
      Roboto,
      'Helvetica Neue',
      'Segoe UI',
      'Apple SD Gothic Neo',
      'Noto Sans KR',
      'Malgun Gothic',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      sans-serif;
  }

  :root {
    --vh: 100%;
  }

  #root {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100vw;
    max-width: 425px;
    height: calc(var(--vh, 1vh) * 100);
    min-height: 100vh;
    overflow-x: hidden;
  }

  select,
  input,
  button,
  textarea {
    font-size: 1.6rem !important;
    background-color: transparent;
    border: 0;
    border-radius: 0;
    outline: 0;
  }

  span {
    white-space: pre-line;
  }
`;

export default globalStyles;
