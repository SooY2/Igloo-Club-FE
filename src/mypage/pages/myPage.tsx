import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../common/styles/theme';
import NavBar from '../../common/components/NavBar';
import ToggleBtn from '../components/ToggleBtn';
import { useEffect, useState } from 'react';
import { Registertypes } from '../../register/types/registerTypes';
import instance from '../../common/apis/axiosInstanse';
import MyProfileCard from '../components/MyProfileCard';

const MyPage = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<Registertypes>({
    nickname: '',
    sex: '',
    birthdate: '',
    contactKakao: null,
    contactInstagram: null,
    animalFace: '',
    job: '',
    height: '',
    mbti: '',
    marriageState: '',
    religion: '',
    alcohol: '',
    smoke: '',
    faceDepictionList: [],
    personalityDepictionList: [],
    description: '',
    markerList: [],
    hobbyList: [],
  });
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const { data } = await instance.get('api/member');
      console.log(data);
      setValues(data);
    } catch (err) {
      console.log(err);
    }
  };

  const ClickEditBtn = () => {
    navigate('/editprofilepage');
  };

  return (
    <div css={Container}>
      <div css={Title}>
        <span>마이페이지</span>
      </div>
      <MyProfileCard
        nickname={values.nickname}
        animalFace={values.animalFace}
        job={values.job}
        description={values.description}
      />
      <div css={Top.Wrapper}>
        <button type="button" onClick={ClickEditBtn} css={Top.TopStyle}>
          <span>프로필 수정</span>
          <button type="button" onClick={ClickEditBtn}></button>
        </button>
        <div css={Top.TopStyleBottom}>
          <span>회사 사람 만나지 않기</span>
          <ToggleBtn />
        </div>
      </div>
      <div css={Middle.Wrapper}>
        <button type="button" onClick={ClickEditBtn} css={Middle.MiddleStyle}>
          서비스 이용약관
        </button>
        <button
          type="button"
          onClick={ClickEditBtn}
          css={Middle.MiddleStyleBottom}
        >
          개인정보 처리방침
        </button>
      </div>
      <div css={Bottom.Wrapper}></div>
      <div css={Navigation}>
        <NavBar />
      </div>
    </div>
  );
};

export default MyPage;

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
  overflow: auto;
  white-space: pre-line;
  background-color: ${theme.colors.white};
`;

const Title = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.6rem;
  color: ${theme.colors.gray9};
  ${theme.fonts.body2b};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-top: 3rem;
    padding-right: 2.7rem;
    padding-left: 2.7rem;
  `,

  TopStyle: css`
    display: flex;
    flex-direction: row;
    color: ${theme.colors.gray9};
    ${theme.fonts.body1m};
  `,

  TopStyleBottom: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 2.2rem;
    color: ${theme.colors.gray9};
    ${theme.fonts.body1m};

    border-bottom: 1px solid #efefef;
  `,
};

const Middle = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-top: 3rem;
    padding-right: 2.7rem;
    padding-left: 2.7rem;
  `,

  MiddleStyle: css`
    display: flex;
    flex-direction: row;
    color: ${theme.colors.gray9};
    ${theme.fonts.body1m};
  `,

  MiddleStyleBottom: css`
    display: flex;
    flex-direction: row;
    padding-bottom: 2.2rem;
    color: ${theme.colors.gray9};
    ${theme.fonts.body1m};

    border-bottom: 1px solid #efefef;
  `,
};

const Bottom = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding-top: 3rem;
    padding-left: 2.7rem;
  `,
};

const Navigation = css`
  position: fixed;
  bottom: 0;
  width: 100%;
`;
