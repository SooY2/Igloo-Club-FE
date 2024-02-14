import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import { useLocation } from 'react-router-dom';
import NavBar from '../../common/components/NavBar';
import ReceivedNungil from '../components/ReceivedNungil';
import MatchingList from '../components/MatchingList';
import SendNungil from '../components/SendNungil';

const NungilList = () => {
  const { state } = useLocation();
  const [selectedBtn, setSelectedBtn] = useState('received');

  let middleContent;

  switch (selectedBtn) {
    case 'received':
      middleContent = <ReceivedNungil />;
      break;
    case 'matching':
      middleContent = <MatchingList />;
      break;
    case 'sent':
      middleContent = <SendNungil />;
      break;
  }

  useEffect(() => {
    if (state && state.selectedBtn) {
      setSelectedBtn(state.selectedBtn);
    }
  }, [state]);

  const handleClickBtn = (selectedBtn: 'received' | 'matching' | 'sent') => {
    setSelectedBtn(selectedBtn);
  };

  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <button
          type="button"
          onClick={() => handleClickBtn('received')}
          css={[Top.NavButton, selectedBtn === 'received' && SelectedNavButton]}
        >
          내가 받은 눈길
        </button>
        <button
          type="button"
          onClick={() => handleClickBtn('matching')}
          css={[Top.NavButton, selectedBtn === 'matching' && SelectedNavButton]}
        >
          매칭 내역
        </button>
        <button
          type="button"
          onClick={() => handleClickBtn('sent')}
          css={[Top.NavButton, selectedBtn === 'sent' && SelectedNavButton]}
        >
          내가 보낸 눈길
        </button>
      </div>
      <div css={Middle.Wrapper}>{middleContent}</div>
      <div css={Navigation}>
        <NavBar />
      </div>
    </div>
  );
};

export default NungilList;

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
  overflow: auto;
  background: ${theme.colors.white};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 5.1rem;
    background: ${theme.colors.white};
  `,

  NavButton: css`
    width: 33.3%;
    height: 5.1rem;
    padding: 0 1.8rem;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    color: ${theme.colors.gray4};
    text-align: center;

    &:hover {
      color: ${theme.colors.black};
      cursor: pointer;
      border-bottom: 2px solid black;
    }
  `,
};

const SelectedNavButton = css`
  color: ${theme.colors.black};
  border-bottom: 2px solid black;
`;

const Middle = {
  Wrapper: css`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    width: 100%;
  `,
};

const Navigation = css`
  position: fixed;
  bottom: 0;
  z-index: 999;
`;
