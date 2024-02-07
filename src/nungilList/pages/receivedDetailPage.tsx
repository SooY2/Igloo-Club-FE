import { css } from '@emotion/react';
import ArrowLeftNav from '../../common/components/ArrowLeftNav';
import DetailProfile from '../../common/pages/detailprofile';
import AcceptNungilBtn from '../components/AcceptBtn';
import { useNavigate } from 'react-router-dom';

const ReceivedDetailPage = () => {
  const navigate = useNavigate();

  const ClickArrowLeft = () => {
    navigate('/nungillist');
  };

  return (
    <div css={Container}>
      <button onClick={ClickArrowLeft}>
        <ArrowLeftNav />
      </button>
      <DetailProfile />
      <div css={SendBtn}>
        <AcceptNungilBtn />
      </div>
    </div>
  );
};

export default ReceivedDetailPage;

const Container = css`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const SendBtn = css`
  position: fixed;
  bottom: 0;
  z-index: 999;
`;
