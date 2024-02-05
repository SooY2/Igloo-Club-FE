import NavBar from '../common/components/NavBar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const Chat = () => {
  return (
    <div css={Container}>
      <div css={Navigation}>
        <NavBar />
      </div>
    </div>
  );
};

export default Chat;

const Container = css`
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 3.6rem;
  overflow: auto;
`;

const Navigation = styled.div`
  position: fixed;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.white};
`;
