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
      <div>
        <button onClick={ClickArrowLeft}>
          <ArrowLeftNav />
        </button>
      </div>
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
  justify-content: space-between;
  width: 100%;
`;

const SendBtn = css`
  position: sticky;
  bottom: 0;
  z-index: 999;
`;
