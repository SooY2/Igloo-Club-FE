/** 매칭 완료 페이지 **/

import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { theme } from '../../common/styles/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../common/apis/axiosInstanse';
import { MatchDatatypes } from '../types/MatchDatatypes';
import StartChatBtn from '../components/StartChatBtn';
import Map from '../../common/components/Map';
import { Xicon } from '../assets/svgs/index';

const FinishMatch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useLocation();
  const [matchData, setMatchData] = useState<MatchDatatypes | undefined>();
  //  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isClickedMarker, setIsClickedMarker] = useState<{
    title: string;
    address: string;
  } | null>(null);
  const title = `축하해요 🎉\n 서로의 눈길이 매칭되었어요`;
  const subtitle = `서로의 눈길이 닿아 매칭이 성사되었어요.\n 채팅방을 통해 두 분의 만남 약속을 잡아보세요!`;

  const ClickXIcon = () => {
    navigate('/nungillist', {
      state: { ...location.state, selectedBtn: 'matching' },
    });
  };

  useEffect(() => {
    localStorage.setItem('selectedBtn', 'matching');
  }, []);

  const handleRecoInfo = async () => {
    try {
      const res = await instance.get('/api/nungil/match', {
        params: {
          nungilId: state.nungilId,
        },
      });
      setMatchData(res.data);

      if (res.data.matchDate) {
        const date = res.data.matchDate;
        let month = date.slice(4, 6);
        if (month.startsWith('0')) {
          month = month.slice(1);
        }
        // const day = date.slice(6, 8);

        // const formatted = `${month}월 ${day}일`;
        // setFormattedDate(formatted);
      }
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
      </div>
      <div css={Recommend.Wrapper}>
        <div css={Recommend.Title}>
          <span>최적의 만남 시간을 알려드려요</span>
        </div>
        <div css={Recommend.SubTitle}>
          두 분이 모두 만남이 가능하다고 응답하신 시간대에요.
        </div>
        {/* <div css={Recommend.RecoBox}>
          <span css={Recommend.RecoTitle}>🗓️ 가능한 요일</span>
          {matchData?.matchYoil && matchData?.matchDate ? (
            <span css={Recommend.RecoContent}>
              {formattedDate} {matchData.matchYoil}
            </span>
          ) : (
            <span css={Recommend.RecoContent}>매칭되는 요일이 없어요 😢</span>
          )}
        </div> */}
        <div css={Recommend.RecoBox}>
          <span css={Recommend.RecoTitle}>⏰ 가능 시간대</span>
          {matchData?.time ? (
            <span css={Recommend.RecoContent}>{matchData.time}</span>
          ) : (
            <span css={Recommend.RecoContent}>채팅으로 시간을 정해보세요!</span>
          )}
        </div>
      </div>
      <div css={Place.Wrapper}>
        <div css={Place.Title}>
          <span>만남 장소, 이런 곳은 어떠세요?</span>
        </div>
        <div css={Place.SubTitle}>
          <span>두분의 의견을 반영하여 최적의 만남 장소를 골라봤어요 📝</span>
        </div>
        <div css={Place.Map}>
          <Map matchData={matchData} setIsClickedMarker={setIsClickedMarker} />
        </div>
        <div css={Place.InfoBox}>
          <ul css={Place.InfoPlaceName}>
            {/* <li css={Place.InfoTitle}>장소명</li> */}
            {isClickedMarker ? (
              <li css={Place.InfoContent}>{isClickedMarker.title}</li>
            ) : matchData?.marker && matchData?.marker.length > 0 ? (
              <li css={Place.InfoContent}>
                지도 내에 위치한 핀을 클릭해보세요!
              </li>
            ) : (
              <li css={Place.InfoContent}>매칭된 장소가 존재하지 않아요</li>
            )}
          </ul>
          {/* <ul css={Place.InfoAddress}>
            <li css={Place.InfoTitle}>주소</li>
            {isClickedMarker ? (
              <li css={Place.InfoContent}>{isClickedMarker.address}</li>
            ) : matchData?.marker && matchData?.marker.length > 0 ? (
              <li css={Place.InfoContent}>
                지도 내에 위치한 핀을 클릭해보세요!
              </li>
            ) : (
              <li css={Place.InfoContent}>매칭된 장소가 존재하지 않아요 😭</li>
            )}
          </ul> */}
        </div>
      </div>
      <div css={StartBtn}>
        <StartChatBtn matchData={matchData} />
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
  overflow: auto;
  white-space: pre-line;
  background-color: ${theme.colors.white};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    align-items: start;
    padding: 3rem;
    border-bottom: 10px solid ${theme.colors.gray0};
  `,

  Notify: css`
    padding-top: 4rem;
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
    height: 10rem;
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
    line-height: 2%.5rem;
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
    gap: 0.3rem;
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
    align-items: center;
    justify-content: start;
    width: 100%;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 700;
    color: ${theme.colors.gray8};
  `,

  RecoContent: css`
    display: flex;
    justify-content: end;
    width: 100%;
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
    padding: 3rem 3rem 0;
  `,

  Title: css`
    color: ${theme.colors.gray9};
    ${theme.fonts.subtitle3};
  `,

  SubTitle: css`
    margin-top: 0.9rem;
    margin-bottom: 1.8rem;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${theme.colors.gray6};
  `,

  Map: css`
    z-index: 1;
    display: flex;
  `,

  InfoBox: css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: center;
    min-width: 30rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
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
    width: 100%;
    font-size: 1.3rem;
    font-weight: 500;
    color: ${theme.colors.gray7};
    text-align: center;
  `,
};

const StartBtn = css`
  width: 100%;
`;
