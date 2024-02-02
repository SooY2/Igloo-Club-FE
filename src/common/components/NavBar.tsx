import { useState } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import HomeBtn000 from '../assets/svgs/home-black.svg';
import HeartBtn000 from '../assets/svgs/heart-black.svg';
import PeopleBtn000 from '../assets/svgs/people-black.svg';
import HomeBtnGRAY from '../assets/svgs/home-white.svg';
import HeartBtnGRAY from '../assets/svgs/heart-white.svg';
import PeopleBtnGRAY from '../assets/svgs/people-white.svg';

const NavBar = () => {
  const navigate = useNavigate();
  const [activeBtn, setActiveBtn] = useState('home');

  const handleClickHomeBtn = () => {
    setActiveBtn('home');
    navigate('/mainPage');
  };

  const handleClickHeartBtn = () => {
    setActiveBtn('heart');
    navigate('/');
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
          alt="blackhome"
        ></img>
      </button>
      <button type="button" onClick={handleClickHeartBtn} css={NavButton}>
        <img
          src={activeBtn === 'heart' ? HeartBtn000 : HeartBtnGRAY}
          alt="whiteheart"
        ></img>
      </button>
      <button type="button" onClick={handleClickPeopleBtn} css={NavButton}>
        <img
          src={activeBtn === 'people' ? PeopleBtn000 : PeopleBtnGRAY}
          alt="whitepeople"
        ></img>
      </button>
    </div>
  );
};

export default NavBar;

const Container = css`
  display: inline-flex;
  flex-direction: row;
  gap: 10.5rem;
  align-items: center;
  width: 100%;
  height: 6.2rem;
  padding-left: 5.6rem;
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
