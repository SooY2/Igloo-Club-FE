/** 메인 페이지 **/

import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import instance from '../../common/apis/axiosInstanse';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/components/NavBar';
import ProfileCard from '../../common/components/ProfileCard';
import PickProfileBtn from '../components/PickProfileBtn';
import CustomSelect from '../components/CustomSelect';
import { ProfileDataTypesProps } from '../../common/type/ProfileDataTypesProps';
import { Watch } from '../assets/svgs/index';

const MainPage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileDataTypesProps[]>([]);
  // const [count, setCount] = useState(5);

  const handleGetAllProfile = async () => {
    try {
      const res = await instance.get('/api/nungil/nungils?status=RECOMMENDED', {
        params: {
          page: 0,
          size: 10,
        },
      });

      console.log(res.data.content);

      setProfileData(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllProfile();
  }, []);

  const ClickPickProfile = () => {
    setProfileData([]);
    handleGetAllProfile();
  };

  const ClickProfileBtn = (nungilId: number) => {
    navigate('/detailpage', { state: { nungilId } });
  };

  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <div css={Top.TitleTop}>
          <CustomSelect />
          <span>에 위치한</span>
        </div>
        <div css={Top.TitleBottom}>
          <span>오늘의 인연을 소개해 드릴게요</span>
        </div>
        <div css={Top.Subtitle}>
          <span>마음이 가는 당신만의 인연에게 눈길을 보내세요.</span>
        </div>
      </div>
      <div css={Middle.Wrapper}>
        <Watch />
        <span>오늘 눈길 매칭 마감까지</span>
        <span css={Middle.PrimaryText}>분</span>
        <span>남았어요!</span>
      </div>
      <div css={Bottom.Wrapper}>
        <span>내가 받은 인연 프로필</span>
        <ProfileCard
          profileData={profileData}
          ClickProfileCard={ClickProfileBtn}
          css={Bottom.ProfileData}
        />
      </div>
      <div css={PickBtn}>
        <PickProfileBtn ProfileData={ClickPickProfile} />
      </div>
      <div css={Navigation}>
        <NavBar />
      </div>
    </div>
  );
};

export default MainPage;

const Container = css`
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 3.6rem;
  overflow: auto;
  background: ${theme.colors.white};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 9.2rem;
    padding-left: 2.6rem;
    margin-bottom: 1.5rem;
  `,

  TitleTop: css`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    ${theme.fonts.title};
  `,

  TitleBottom: css`
    ${theme.fonts.title};
  `,

  Subtitle: css`
    display: flex;
    color: ${theme.colors.gray6};
    ${theme.fonts.body2m};
  `,
};

const Middle = {
  Wrapper: css`
    display: flex;
    flex-direction: row;
    gap: 0.6rem;
    align-items: center;
    width: 34.2rem;
    height: 4rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    padding-left: 4.5rem;
    margin-bottom: 3.9rem;
    margin-left: 2rem;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    color: ${theme.colors.gray9};
    text-align: center;
    background-color: ${theme.colors.alpha10_primary};
    border-radius: 10px;
  `,

  PrimaryText: css`
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    color: ${theme.colors.primary};
    text-align: center;
  `,
};

const Bottom = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    padding-left: 2.6rem;
    margin-bottom: 8.2rem;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  ProfileData: css`
    display: flex;
    margin-top: 1.5rem;
  `,
};

const PickBtn = css`
  position: fixed;
  bottom: 0;
  left: 50%;
  z-index: 999;
  margin-bottom: 8.2rem;
  transform: translateX(-50%);
`;

const Navigation = css`
  position: fixed;
  bottom: 0;
  background-color: ${theme.colors.white};
`;
