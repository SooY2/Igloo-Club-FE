import { css } from '@emotion/react';
import ArrowLeftNav from '../../common/components/ArrowLeftNav';
import DetailProfile from '../../common/pages/detailprofile';
import FinishSendNungilBtn from '../components/FinishSendBtn';
import { useNavigate } from 'react-router-dom';

const SendDetailPage = () => {
  const navigate = useNavigate();

  const ClickArrowLeft = () => {
    navigate('/nungillist', { state: { selectedBtn: 'sent' } });
  };

  return (
    <div css={Container}>
      <div>
        <button onClick={ClickArrowLeft}>
          <ArrowLeftNav />
        </button>
      </div>
      <DetailProfile />
      <div css={SendBtn}>
        <FinishSendNungilBtn />
      </div>
    </div>
  );
};

export default SendDetailPage;

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
`;

const SendBtn = css`
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  max-width: 42.5rem;
`;
