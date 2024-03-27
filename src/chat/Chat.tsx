import { css } from '@emotion/react';
import styled from '@emotion/styled';
import NavBar from '../common/components/NavBar';
import ChatRoomBox from './components/ChatRoomBox';
import { useEffect, useState } from 'react';
import instance from '../common/apis/axiosInstanse';

const Chat = () => {
  const [chatList, setChatList] = useState([]);
  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = async () => {
    try {
      const { data } = await instance.get('api/chat/room');
      setChatList(data.content);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <section css={Container}>
        <header css={Top.Wrapper}>
          <StHeaderTitle>채팅</StHeaderTitle>
          <StHeaderExplain>
            모든 채팅방은 눈길 매칭 후 일주일 동안 유지되며, 이후 일괄 삭제돼요
          </StHeaderExplain>
        </header>
        <main css={Middle.Wrapper}>
          <div css={Middle.Box}>
            {chatList.length > 0 ? (
              <>
                {chatList.map((item, idx) => {
                  const {
                    animalFace,
                    senderNickName,
                    content,
                    createdAt,
                    chatRoomId,
                  } = item;
                  return (
                    <ChatRoomBox
                      key={senderNickName + idx}
                      animalFace={animalFace}
                      senderNickName={senderNickName}
                      content={content}
                      createdAt={createdAt}
                      chatRoomId={chatRoomId}
                    />
                  );
                })}
              </>
            ) : (
              <p>채팅 내역이 없습니다</p>
            )}
          </div>
        </main>
      </section>
      <footer css={Navigation}>
        <NavBar />
      </footer>
    </>
  );
};

export default Chat;

const Container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2.2rem 1.6rem;
  overflow: auto;
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    width: 100%;
    margin-bottom: 1.2rem;
  `,
};

const StHeaderTitle = styled.h1`
  ${({ theme }) => theme.fonts.subtitle2b};

  margin-top: 1rem;
  margin-left: 1.3rem;
`;

const StHeaderExplain = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3.9rem;
  background-color: ${({ theme }) => theme.colors.gray0};
  border-radius: 10px;

  ${({ theme }) => theme.fonts.body3m};
`;

const Middle = {
  Wrapper: css`
    padding-bottom: 5rem;
    overflow-y: scroll;
  `,
  Box: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: start;
    width: 100%;
  `,
};

const Navigation = css`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
