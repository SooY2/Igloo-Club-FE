import { css } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import instance from '../../common/apis/axiosInstanse';
import { theme } from '../../common/styles/theme';
import { Lightning } from '../assets/svgs/index';

const SendNungilBtn = () => {
  const location = useLocation();
  const { state } = location;

  console.log('send :', state.nungilId);

  const handleClickBtn = async () => {
    try {
      await instance.post('/api/nungil/send?', null, {
        params: {
          nungilId: state.nungilId,
        },
      });
      console.log('눈길 보내기 완료');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div css={Container}>
      <button type="button" onClick={handleClickBtn} css={SendBtn}>
        <Lightning />
        눈길 보내기
      </button>
    </div>
  );
};

export default SendNungilBtn;

const Container = css`
  width: 100%;
  height: 9rem;
  padding: 1.6rem 2.7rem 4.8rem;
  background: ${theme.colors.white};
  border-top: 1px solid #e3e3e3;
`;

const SendBtn = css`
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.5rem;
  padding: 1.5rem 14rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${theme.colors.white};
  text-align: center;
  background-color: ${theme.colors.primary};
  border-radius: 15px;

  &:hover {
    cursor: pointer;
  }
`;
