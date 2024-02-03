import { css } from '@emotion/react';
import DetailProfile from '../../common/pages/detailprofile';
import SendNungilBtn from '../components/SendBtn';

const DetailPage = () => {
  return (
    <div css={Container}>
      <DetailProfile />
      <div css={SendBtn}>
        <SendNungilBtn />
      </div>
    </div>
  );
};

export default DetailPage;

const Container = css`
  display: flex;
  width: 100%;
`;

const SendBtn = css`
  position: fixed;
  bottom: 0;
`;
