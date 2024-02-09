import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import instance from '../../common/apis/axiosInstanse';
import { Lightning } from '../assets/svgs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PickProfileBtn = ({ ProfileData }: any) => {
  const handleClickBtn = async () => {
    try {
      const res = await instance.post('/api/nungil/recommend', {
        isPayed: true,
      });
      const { companyName, job, description } = res.data;
      console.log(companyName);

      ProfileData({ companyName, job, description });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div css={Container}>
      <button type="button" onClick={handleClickBtn} css={PickBtn}>
        <Lightning />
        오늘의 인연 프로필 뽑기
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
  gap: 7px;
  align-items: center;
  justify-content: center;
  width: 20.5rem;
  height: 4.8rem;
  padding: 1.4rem 1rem;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  color: ${theme.colors.white};
  text-align: center;
  background: linear-gradient(90deg, #ffaa81 0%, #ff7781 51.24%, #ff6b72 100%);
  border-radius: 25px;

  &:hover {
    cursor: pointer;
  }
`;
