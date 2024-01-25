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

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }

  #root {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100vw;
    max-width: 425px;
    min-height: 100vh;
    overflow-x: hidden;
  }
`;

export default globalStyles;
