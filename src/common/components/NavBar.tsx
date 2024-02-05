import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import HomeBtn000 from '../assets/svgs/home-black.svg';
import ChatBtn000 from '../assets/svgs/chat-black.svg';
import HeartBtn000 from '../assets/svgs/heart-black.svg';
import PeopleBtn000 from '../assets/svgs/people-black.svg';
import HomeBtnGRAY from '../assets/svgs/home-white.svg';
import ChatBtnGRAY from '../assets/svgs/chat-white.svg';
import HeartBtnGRAY from '../assets/svgs/heart-white.svg';
import PeopleBtnGRAY from '../assets/svgs/people-white.svg';

const NavBar = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState('home');

  const handleClickHomeBtn = () => {
    setActiveBtn('home');
    navigate('/main-page');
  };

  const handleClickChatBtn = () => {
    setActiveBtn('chat');
    navigate('/');
  };

  const handleClickHeartBtn = () => {
    setActiveBtn('heart');
    navigate('/nungillist');
  };

  const handleClickPeopleBtn = () => {
    setActiveBtn('people');
    navigate('/');
  };

  return (
    <div css={Container}>
      <button type="button" onClick={handleClickHomeBtn} css={NavButton}>
        <img
          src={activeBtn === 'home' ? HomeBtn000 : HomeBtnGRAY}
          alt="home"
        ></img>
      </button>
      <button type="button" onClick={handleClickChatBtn} css={NavButton}>
        <img
          src={activeBtn === 'chat' ? ChatBtn000 : ChatBtnGRAY}
          alt="chat"
        ></img>
      </button>
      <button type="button" onClick={handleClickHeartBtn} css={NavButton}>
        <img
          src={activeBtn === 'heart' ? HeartBtn000 : HeartBtnGRAY}
          alt="heart"
        ></img>
      </button>
      <button type="button" onClick={handleClickPeopleBtn} css={NavButton}>
        <img
          src={activeBtn === 'people' ? PeopleBtn000 : PeopleBtnGRAY}
          alt="people"
        ></img>
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
  padding-right: 5rem;
  padding-left: 5rem;
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
