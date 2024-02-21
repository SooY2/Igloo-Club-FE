/** 메인 페이지 **/

import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import instance from '../../common/apis/axiosInstanse';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/components/NavBar';
import NowMatching from '../components/NowMatching';
import ComingSoon from '../components/ComingSoon';
import ProfileCard from '../../common/components/ProfileCard';
import PickProfileBtn from '../components/PickProfileBtn';
import CustomSelect from '../components/CustomSelect';
import { ProfileDataTypesProps } from '../../common/type/ProfileDataTypesProps';
import { calculateTimeLeft } from '../components/CountDown';
import CountDown from '../components/CountDown';
import { Watch } from '../assets/svgs/index';

const MainPage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileDataTypesProps[]>([]);
  const [matchingTime, setMatchingTime] = useState<boolean>();
  const [selected, setSelected] = useState<string>('');

  const handleGetAllProfile = async () => {
    try {
      const res = await instance.get('/api/nungil/nungils?status=RECOMMENDED', {
        params: {
          page: 0,
          size: 10,
        },
      });

      setProfileData(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMatchingTime = async () => {
    const newTime = calculateTimeLeft().matchingTime;
    setMatchingTime(newTime);
  };

  useEffect(() => {
    handleMatchingTime();
    handleGetAllProfile();
  }, []);

  const ClickPickProfile = () => {
    handleGetAllProfile();
    setProfileData([]);
  };

  const ClickProfileBtn = (nungilId: number, nickname: string) => {
    navigate(`/detailpage/${nungilId}`, { state: { nungilId, nickname } });
  };

  const handleSelectedChange = (newSelected: string) => {
    setSelected(newSelected);
    handleGetAllProfile();
  };

  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <div css={Top.TitleTop}>
          <CustomSelect onSelectedChange={handleSelectedChange} />
          <span>에 위치한</span>
        </div>
        <div css={Top.TitleBottom}>
          <span>오늘의 인연을 소개해 드릴게요</span>
        </div>
      </div>
      <div css={Middle.Wrapper}>
        {matchingTime ? (
          <div css={Middle.TimeBox}>
            <Watch />
            <span>오늘 눈길 매칭 마감까지</span>
            <span css={Middle.PrimaryText}>
              <CountDown onMatchingTime={handleMatchingTime} />
            </span>
            <span>남았어요!</span>
          </div>
        ) : (
          <div css={Middle.TimeBox}>
            <Watch />
            <span>내가 뽑은 프로필은 매일</span>
            <span css={Middle.PrimaryText}>오전 11시</span>
            <span>에 일괄 삭제돼요</span>
          </div>
        )}
      </div>
      <div css={Bottom.Wrapper}>
        {matchingTime ? (
          selected === '판교' ? (
            <ComingSoon />
          ) : (
            <ProfileCard
              profileData={profileData}
              ClickProfileCard={ClickProfileBtn}
              nungilState="main"
              css={Bottom.ProfileData}
            />
          )
        ) : (
          <NowMatching />
        )}
      </div>
      <div css={PickBtn}>
        {matchingTime ? (
          <PickProfileBtn ProfileData={ClickPickProfile} />
        ) : null}
      </div>
      <div css={Navigation}>
        <NavBar />
      </div>
    </div>
  );
};

export default MainPage;

const Container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
  overflow: auto;
  background: ${theme.colors.white};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    height: 9.2rem;
    padding-left: 2.6rem;
    margin-bottom: 1.5rem;
  `,

  TitleTop: css`
    display: flex;
    flex-direction: row;
    gap: 0.2rem;
    align-items: center;
    ${theme.fonts.title};
  `,

  TitleBottom: css`
    ${theme.fonts.title};
  `,
};

const Middle = {
  Wrapper: css`
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    min-width: 33rem;
    height: 4rem;
    padding: 1.2rem 2.2rem;
    margin-right: 2rem;
    margin-bottom: 2.9rem;
    margin-left: 2rem;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    color: ${theme.colors.gray9};
    text-align: center;
    background-color: ${theme.colors.alpha10_primary};
    border-radius: 10px;
  `,

  TimeBox: css`
    display: flex;
    flex-direction: row;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
  `,

  PrimaryText: css`
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    color: ${theme.colors.primary};
  `,
};

const Bottom = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    padding: 0 2.6rem 7rem;
    margin-bottom: 6.5rem;
    overflow-y: scroll;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  `,

  ComingSoon: css`
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 15rem;
  `,

  ComingSoonText: css`
    font-size: 4rem;
    color: #6b6b6b;
    text-align: center;
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
  margin-bottom: 7rem;
  transform: translateX(-50%);
`;

const Navigation = css`
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  max-width: 42.5rem;
`;
