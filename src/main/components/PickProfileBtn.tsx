import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import instance from '../../common/apis/axiosInstanse';

const PickProfileBtn = () => {
  const handleClickBtn = async () => {
    try {
      const res = await instance.post('/api/nungil/recommend', {
        isPayed: true,
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div css={Container}>
      <button type="button" onClick={handleClickBtn} css={PickBtn}>
        프로필 뽑기
      </button>
    </div>
  );
};

export default PickProfileBtn;

const Container = css`
  display: flex;
`;

const PickBtn = css`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 11rem;
  height: 3.5rem;
  padding: 1.4rem 1rem;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  color: ${theme.colors.white};
  text-align: center;
  background: ${theme.colors.primary};
  border-radius: 25px;
`;
