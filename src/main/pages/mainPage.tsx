/** 메인 페이지 **/

import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../common/styles/theme';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../common/components/NavBar';
import ComingSoon from '../components/ComingSoon';
import ProfileCard from '../../common/components/ProfileCard';
// import PickProfileBtn from '../components/PickProfileBtn';
import CustomSelect from '../components/CustomSelect';
import LoginModal from '../components/LoginModal';
import { ProfileDataTypesProps } from '../../common/type/ProfileDataTypesProps';
import axios, { AxiosRequestConfig } from 'axios';
// import CountDown from '../components/CountDown';

const MainPage = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileDataTypesProps[]>([]);
  const [selected] = useState<string>('');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const ACCESS_TOKEN = localStorage.getItem('ACCESS_TOKEN');

  const handleGetAllProfile = async () => {
    const headerss: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // 토큰이 있으면 Authorization 헤더에 추가합니다.
    if (ACCESS_TOKEN) {
      headerss['Authorization'] = `Bearer ${ACCESS_TOKEN}`;
    }

    // config 객체 내에서 headers를 직접 정의합니다.
    const config: AxiosRequestConfig = {
      headers: headerss,
    };

    try {
      console.log({ ...config });
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/nungil/nungils?status=RECOMMENDED`,
        {
          ...config,
          params: {
            page: 0,
            size: 10,
          },
        },
      );
      console.log(res);
      setProfileData(res.data.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllProfile();
  }, []);

  // const ClickPickProfile = () => {
  //   handleGetAllProfile();
  //   setProfileData([]);
  // };

  const ClickProfileBtn = (nungilId: number, nickname: string) => {
    const accessToken = localStorage.getItem('ACCESS_TOKEN');
    if (!accessToken) {
      setIsLoginModalOpen(true);
    } else {
      navigate(`/detailpage/${nungilId}`, { state: { nungilId, nickname } });
    }
  };

  // const handleSelectedChange = (newSelected: string) => {
  //   setSelected(newSelected);
  //   handleGetAllProfile();
  // };

  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <div css={Top.TitleTop}>
          <CustomSelect
          // onSelectedChange={handleSelectedChange}
          />
          <span>에서</span>
        </div>
        <div css={Top.TitleBottom}>
          <p>우리 학교 친구와</p>
          <p>빠르게 만나 봄 축제 즐기기 ⚡️️</p>
        </div>
      </div>
      <div css={Middle.Wrapper}>
        <div css={Middle.TimeBox}>
          {/* <span css={countdown}>
            <CountDown />
          </span> */}
          {/* <span css={Middle.PrimaryText}>인연 프로필 삭제</span> */}
          <span>📢 보이는 카드들은 전부 앞으로 만날 수 있는 사람들이에요.</span>
        </div>
      </div>
      <div css={Bottom.Wrapper}>
        {selected === '경기도 판교' ? (
          <ComingSoon />
        ) : (
          <ProfileCard
            profileData={profileData}
            ClickProfileCard={ClickProfileBtn}
            // nungilState="main"
            css={Bottom.ProfileData}
          />
        )}
      </div>
      {/* <div css={PickBtn}>
        <PickProfileBtn ProfileData={ClickPickProfile} />
      </div> */}
      <div css={Navigation}>
        <NavBar setIsLoginModalOpen={setIsLoginModalOpen} />
      </div>
      {isLoginModalOpen && (
        <StModalContainer>
          <LoginModal closeModal={() => setIsLoginModalOpen(false)} />
        </StModalContainer>
      )}
    </div>
  );
};

export default MainPage;

const Container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 3rem;
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
    ${theme.fonts.body1b};
    ${theme.colors.gray7};
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
    padding: 1.2rem;
    margin-right: 2rem;
    margin-bottom: 2.9rem;
    margin-left: 2rem;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 600;
    color: #7a7a7a;
    text-align: center;
    background-color: #f6f6f6;
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
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 700;
    color: ${theme.colors.primary};
  `,
};

// const countdown = css`
//   padding: 0.8rem 1.2rem;
//   margin-right: 0.3rem;
//   font-size: 1.3rem;
//   font-style: normal;
//   font-weight: 700;
//   color: ${theme.colors.primary};
//   background: rgb(250 114 104 / 10%);
//   border-radius: 20px;
// `;

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

// const PickBtn = css`
//   position: fixed;
//   bottom: 0;
//   left: 50%;
//   z-index: 999;
//   margin-bottom: 7rem;
//   transform: translateX(-50%);
// `;

const Navigation = css`
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  max-width: 42.5rem;
`;

const StModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
`;
