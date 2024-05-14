import { css } from '@emotion/react';
import { theme } from '../styles/theme';
import { useNavigate, useLocation } from 'react-router-dom';
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

interface StateType {
  selectedBtn: string;
}

const NavBar = ({
  setIsLoginModalOpen,
}: {
  setIsLoginModalOpen: (value: boolean) => void;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleActiveBtn = (path: string) => {
    if (location.pathname === path) {
      return 'active';
    } else {
      return 'inactive';
    }
  };

  const handleNavButtonClick = (path: string, state?: StateType) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (!accessToken) {
      setIsLoginModalOpen(true);
    } else {
      navigate(path, { state });
    }
  };

  return (
    <div css={Container}>
      <button
        type="button"
        onClick={() => handleNavButtonClick('/main-page')}
        css={NavButton}
      >
        {handleActiveBtn('/main-page') === 'active' ? (
          <HomeBtn000 />
        ) : (
          <HomeBtnGRAY />
        )}
      </button>
      <button
        type="button"
        onClick={() => handleNavButtonClick('/chat')}
        css={NavButton}
      >
        {handleActiveBtn('/chat') === 'active' ? (
          <ChatBtn000 />
        ) : (
          <ChatBtnGRAY />
        )}
      </button>
      <button
        type="button"
        onClick={() =>
          handleNavButtonClick('/nungillist', { selectedBtn: 'received' })
        }
        css={NavButton}
      >
        {handleActiveBtn('/nungillist') === 'active' ? (
          <HeartBtn000 />
        ) : (
          <HeartBtnGRAY />
        )}
      </button>
      <button
        type="button"
        onClick={() => handleNavButtonClick('/mypage')}
        css={NavButton}
      >
        {handleActiveBtn('/mypage') === 'active' ? (
          <PeopleBtn000 />
        ) : (
          <PeopleBtnGRAY />
        )}
      </button>
    </div>
  );
};

export default NavBar;

const Container = css`
  display: flex;
  flex-direction: row;
  gap: 5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 42.5rem;
  height: 6.2rem;
  padding: 0 3rem;
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
