import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowLeftNav from '../../common/components/ArrowLeftNav';
import DetailProfile from '../../common/pages/detailprofile';
import SendNungilBtn from '../components/SendBtn';

const DetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { nungilId, nickname } = location?.state || {};

  const ClickArrowLeft = () => {
    navigate('/main-page');
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
        <SendNungilBtn nungilId={nungilId} nickname={nickname} />
      </div>
    </div>
  );
};

export default DetailPage;

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding-top: 1.5rem;
`;

const SendBtn = css`
  position: sticky;
  bottom: 0;
  z-index: 999;
`;
