import { css } from '@emotion/react';
import { useNavigate, useLocation } from 'react-router-dom';
import instance from '../../common/apis/axiosInstanse';
import { theme } from '../../common/styles/theme';

const AcceptNungilBtn = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  console.log('send :', state.nungilId);

  const handleAcceptNungil = async () => {
    try {
      await instance.patch(`/api/nungil/match?nungilId=${state.nungilId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const ClickAcceptBtn = () => {
    handleAcceptNungil();
    navigate(`/finishmatch/${state.nungilId}`, {
      state: { nungilId: state.nungilId },
    });
  };

  return (
    <div css={Container}>
      <button type="button" onClick={ClickAcceptBtn} css={SendBtn}>
        눈길 수락하기
      </button>
    </div>
  );
};

export default AcceptNungilBtn;

const Container = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  max-width: 42.5rem;
  height: 9rem;
  padding: 0 2rem;
  background: ${theme.colors.white};
  border-top: 1px solid #e3e3e3;
`;

const SendBtn = css`
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  height: 5.5rem;
  padding: 1.5rem 8rem;
  font-size: 1.4rem;
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
