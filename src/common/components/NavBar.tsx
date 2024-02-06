import { useState } from 'react';
import { css } from '@emotion/react';
import { theme } from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import {
  HomeBtn000,
  ChatBtn000,
  HeartBtn000,
  PeopleBtn000,
  HomeBtnGRAY,
  ChatBtnGRAY,
  HeartBtnGRAY,
  PeopleBtnGRAY,
} from '../assets/svgs/index';

const NavBar = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState<string>('home');

  const handleClickBtn = (btn: string, path: string) => {
    setActiveBtn(btn);
    navigate(path);
  };

  return (
    <div css={Container}>
      <button
        type="button"
        onClick={() => handleClickBtn('home', '/main-page')}
        css={NavButton}
      >
        {activeBtn === 'home' ? <HomeBtn000 /> : <HomeBtnGRAY />}
      </button>
      <button
        type="button"
        onClick={() => handleClickBtn('chat', '/')}
        css={NavButton}
      >
        {activeBtn === 'chat' ? <ChatBtn000 /> : <ChatBtnGRAY />}
      </button>
      <button
        type="button"
        onClick={() => handleClickBtn('heart', '/nungillist')}
        css={NavButton}
      >
        {activeBtn === 'heart' ? <HeartBtn000 /> : <HeartBtnGRAY />}
      </button>
      <button
        type="button"
        onClick={() => handleClickBtn('people', '/mypage')}
        css={NavButton}
      >
        {activeBtn === 'people' ? <PeopleBtn000 /> : <PeopleBtnGRAY />}
      </button>
    </div>
  );
};

export default NavBar;

const Container = css`
  display: flex;
  flex-direction: row;
  gap: 7rem;
  align-items: center;
  width: 100%;
  height: 6.2rem;
  padding: 0 4rem;
  background-color: ${theme.colors.white};
`;

const NavButton = css`
  img {
    width: 2.4rem;
    height: 2.4rem;
  }

  &:hover {
    cursor: pointer;
  }
`;
