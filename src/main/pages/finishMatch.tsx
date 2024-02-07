/** 매칭 완료 페이지 **/

import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../common/apis/axiosInstanse';
import StartChatBtn from '../components/StartChatBtn';
import Map from '../components/Map';
import { Xicon } from '../assets/svgs/index';
import { Notify } from '../assets/svgs/index';

const FinishMatch = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [matchData, setMatchData] = useState<any>('');
  const title = `축하해요 🎉\n 서로의 눈길이 매칭되었어요`;
  const subtitle = `서로의 눈길이 닿아 매칭이 성사되었어요.\n 채팅방을 통해 두 분의 첫만남 약속을 잡아보세요!`;
  const noticontent = `첫만남 장소와 시간 조차 정하기 어려워하는 당신을 위해\n 저희가 직접 만남 장소와 시간대도 추천해 드려요.`;

  const ClickXIcon = () => {
    navigate('/nungillist');
  };

  const handleRecoInfo = async () => {
    try {
      const res = await instance.get('/api/nungil/match', {
        params: {
          nungilId: state.nungilId,
        },
      });
      console.log(res.data);
      setMatchData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleRecoInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <button onClick={ClickXIcon}>
          <Xicon />
        </button>
        <div css={Top.Notify}>매칭 완료</div>
        <div css={Top.Title}>{title}</div>
        <div css={Top.SubTitle}>{subtitle}</div>
        <div css={Top.NotiBox}>
          <div css={Top.NotiTitle}>
            <Notify />
            <span>빠른 시일 내에 만나 친밀도를 쌓는 게 중요해요</span>
          </div>
          <div css={Top.NotiContent}>
            <span>{noticontent}</span>
          </div>
        </div>
      </div>
      <div css={Recommend.Wrapper}>
        <div css={Recommend.Title}>
          <span>최적의 첫만남 요일과 시간을 알려드려요</span>
        </div>
        <div css={Recommend.SubTitle}>
          두 분이 모두 만남이 가능하다고 응답하신 요일과 시간대에요.
        </div>
        <div css={Recommend.RecoBox}>
          <span css={Recommend.RecoTitle}>🗓️ 가능한 요일</span>
          <span css={Recommend.RecoContent}>{matchData.yoil}</span>
        </div>
        <div css={Recommend.RecoBox}>
          <span css={Recommend.RecoTitle}>⏰ 가능 시간대</span>
          <span css={Recommend.RecoContent}></span>
        </div>
      </div>
      <div css={Place.Wrapper}>
        <div css={Place.Title}>
          <span>첫만남 장소, 이런 곳은 어떠세요?</span>
        </div>
        <div css={Place.SubTitle}>
          <span>
            두 분의 의견을 반영하여 최적의 첫만남 장소를 골라봤어요 📝
          </span>
        </div>
        <div css={Place.Map}>
          <Map />
        </div>
        <div css={Place.InfoBox}>
          <ul css={Place.InfoPlaceName}>
            <li css={Place.InfoTitle}>장소명</li>
            <li css={Place.InfoContent}></li>
          </ul>
          <ul css={Place.InfoAddress}>
            <li css={Place.InfoTitle}>주소</li>
            <li css={Place.InfoContent}></li>
          </ul>
        </div>
      </div>
      <div css={StartBtn}>
        <StartChatBtn />
      </div>
    </div>
  );
};

export default FinishMatch;

const Container = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding-top: 1.5rem;
  overflow: auto;
  white-space: pre-line;
  background-color: ${theme.colors.white};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 0 3rem 3.3rem;
    border-bottom: 10px solid ${theme.colors.gray0};
  `,

  Notify: css`
    padding-top: 5.3rem;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 600;
    color: ${theme.colors.primary};
  `,

  Title: css`
    display: flex;
    gap: 0.5rem;
    padding-top: 2rem;
    color: ${theme.colors.gray9};
    ${theme.fonts.title};
  `,

  SubTitle: css`
    padding-top: 1rem;
    line-height: 1.8rem;
    color: ${theme.colors.gray6};
    ${theme.fonts.body2m};
  `,

  NotiBox: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: 33rem;
    height: 9rem;
    padding: 0 1.3rem;
    margin-top: 2.3rem;
    background-color: #f8f9fd;
    border-radius: 8px;
  `,

  NotiTitle: css`
    display: flex;
    flex-direction: row;
    gap: 0.9rem;
    align-items: center;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    color: #444b53;
    text-align: center;
  `,

  NotiContent: css`
    padding-top: 0.7rem;
    padding-left: 2.9rem;
    line-height: 1.8rem;
    color: #86929f;
    ${theme.fonts.body3m};
  `,
};

const Recommend = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    justify-content: start;
    padding: 3.1rem 3rem 4.4rem;
    border-bottom: 10px solid ${theme.colors.gray0};
  `,

  Title: css`
    color: ${theme.colors.gray9};
    ${theme.fonts.subtitle3};
  `,

  SubTitle: css`
    margin-top: 0.9rem;
    margin-bottom: 0.9rem;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${theme.colors.gray6};
  `,

  RecoBox: css`
    display: flex;
    flex-direction: row;
    gap: 17rem;
    align-items: center;
    min-width: 30rem;
    height: 5.9rem;
    padding: 0 1.8rem;
    margin-top: 0.9rem;
    background: ${theme.colors.gray0};
    border-radius: 17px;
  `,

  RecoTitle: css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 700;
    color: ${theme.colors.gray8};
  `,

  RecoContent: css`
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 600;
    color: ${theme.colors.gray7};
  `,
};

const Place = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    padding: 3rem 3rem 8rem;
  `,

  Title: css`
    color: ${theme.colors.gray9};
    ${theme.fonts.subtitle3};
  `,

  SubTitle: css`
    margin-top: 0.9rem;
    margin-bottom: 1.8rem;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${theme.colors.gray6};
  `,

  Map: css`
    z-index: 1;
  `,

  InfoBox: css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    width: 34rem;
    height: 8.7rem;
    padding-left: 2rem;
    margin-top: 1.4rem;
    margin-bottom: 5rem;
    background-color: #fafafa;
    border-radius: 5px;
  `,

  InfoPlaceName: css`
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
  `,

  InfoAddress: css`
    display: flex;
    flex-direction: row;
    gap: 2.3rem;
  `,

  InfoTitle: css`
    display: flex;
    font-size: 13px;
    font-style: normal;
    font-weight: 700;
    color: ${theme.colors.gray8};
  `,

  InfoContent: css`
    display: flex;
    font-size: 13px;
    font-style: normal;
    font-weight: 500;
    color: ${theme.colors.gray7};
  `,
};

const StartBtn = css`
  position: sticky;
  bottom: 0;
  z-index: 999;
`;
