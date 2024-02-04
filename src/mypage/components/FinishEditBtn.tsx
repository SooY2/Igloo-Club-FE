import { css } from '@emotion/react';
import instance from '../../common/apis/axiosInstanse';
import { theme } from '../../common/styles/theme';
import { useNavigate } from 'react-router-dom';

const FinishEditBtn = () => {
  const navigate = useNavigate();

  const handleClickBtn = async () => {
    try {
      await instance.patch('/api/member', {});
      console.log('프로필 수정 완료');

      navigate('/mypage');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div css={Container}>
      <button type="button" onClick={handleClickBtn} css={FinishBtn}>
        프로필 수정 완료하기
      </button>
    </div>
  );
};

export default FinishEditBtn;

const Container = css`
  width: 100%;
  height: 9rem;
  padding: 1.7rem 2.3rem;
  background: ${theme.colors.white};
  border-top: 1px solid #e3e3e3;
`;

const FinishBtn = css`
  display: flex;
  flex-direction: row;
  gap: 0.9rem;
  align-items: center;
  justify-content: center;
  width: 38rem;
  height: 5.5rem;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${theme.colors.white};
  text-align: center;
  background-color: ${theme.colors.primary};
  border-radius: 10px;
`;
