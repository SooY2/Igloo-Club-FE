import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import { useNavigate } from 'react-router-dom';
import FinishEditBtn from '../components/FinishEditBtn';
import { ArrowLeft } from '../assets/svgs/index';

const EditProfilePage = () => {
  const navigate = useNavigate();

  const ClickArrowLeft = () => {
    navigate('/mypage');
  };
  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <button type="button" onClick={ClickArrowLeft}>
          <ArrowLeft />
        </button>
        <span css={Top.Title}>기본 프로필 수정</span>
      </div>
      <div css={Middle.Wrapper}></div>
      <div css={FinishBtn}>
        <FinishEditBtn />
      </div>
    </div>
  );
};

export default EditProfilePage;

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
  overflow: auto;
  background: ${theme.colors.white};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 2rem;
    color: ${theme.colors.gray9};
    ${theme.fonts.body2b};
  `,

  Title: css`
    padding-left: 13rem;
  `,
};

const Middle = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    padding-top: 3.6rem;
    padding-left: 2.7rem;
  `,
};

const FinishBtn = css`
  position: sticky;
  bottom: 0;
  z-index: 999;
`;
