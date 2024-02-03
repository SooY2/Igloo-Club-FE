/** 프로필 상세 페이지 **/

import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { theme } from '../styles/theme';
import instance from '../apis/axiosInstanse';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from '../../main/assets/svgs/index';

const DetailProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<any>('');

  const title = `안녕하세요!\n 저는 ${profileData.nickname}이라고 합니다.`;

  const context = `#${profileData.companyName}에 재직 중인\n 
  #${profileData.age}세 남성이고 #${profileData.job}\n 
  얼굴은 #${profileData.animalFace} 
  키는 #${profileData.height}cm\n 성격 유형은 #${profileData.mbti}`;

  const ClickArrowLeft = () => {
    navigate('/mainPage');
  };

  console.log(state);

  useEffect(() => {
    const handleGetDetailProfile = async () => {
      try {
        const res = await instance.get('/api/nungil/detail', {
          params: {
            nungilId: state.nungilId,
          },
        });

        console.log(res.data);
        setProfileData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    handleGetDetailProfile();
  }, []);

  return (
    <div css={Container}>
      <div css={Top.Wrapper}>
        <ArrowLeft onClick={ClickArrowLeft} />
        <div css={Top.Title}>{title}</div>
        <div css={Top.Detail}>
          {context.split('\n').map((line, index) => (
            <div key={index} css={Top.DetailText}>
              {highlightKeywords(line)}
            </div>
          ))}
        </div>
        <div css={Top.InfoBox}>
          <div css={Top.InfoTitle}>
            <span>저는요, 👋🏻</span>
          </div>
          <div css={Top.InfoSubtitle}>
            <span>{profileData.description}</span>
          </div>
        </div>
      </div>
      <div css={Middle.Wrapper}>
        <div css={Middle.ExAttr}>
          <div css={Middle.ExAttrTitle}>
            <span>나의 외적인 매력은</span>
          </div>
          <div css={Middle.ExAttrList}></div>
        </div>
        <div css={Middle.InAttr}>
          <div css={Middle.InAttrTitle}>
            <span>나의 내적인 매력은</span>
          </div>
          <div css={Middle.InAttrList}></div>
        </div>
        <div css={Middle.Notice}>
          <div css={Middle.NoticeTitle}>
            <span>이건 알아두세요!</span>
          </div>
          <div css={Middle.NoticeList}></div>
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;

const highlightKeywords = (line) => {
  return (
    <div>
      {line.split(/(#\w+)/).map((part, index) =>
        part.startsWith('#') ? (
          <span key={index} css={Top.HashtagText}>
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </div>
  );
};

const Container = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-top: 3.6rem;
  overflow: auto;
  background-color: ${theme.colors.white};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-left: 2.7rem;
  `,

  Title: css`
    display: flex;
    padding-top: 2.5rem;
    color: ${theme.colors.gray8};
    ${theme.fonts.title}

    white-space: pre-line;
  `,

  Detail: css`
    display: flex;
    flex-direction: column;
    padding-top: 10.9rem;
    margin-bottom: 3.2rem;
    white-space: pre-line;
  `,

  DetailText: css`
    display: flex;
    flex-direction: row;
    color: ${theme.colors.gray9};
    ${theme.fonts.subtitle2m};
  `,

  HashtagText: css`
    color: ${theme.colors.primary};
  `,

  InfoBox: css`
    display: flex;
    flex-direction: column;
    width: 34rem;
    height: 13rem;
    padding-top: 2.2rem;
    padding-left: 2rem;
    background-color: ${theme.colors.gray0};
    border-radius: 10px;
  `,

  InfoTitle: css`
    display: flex;
    color: #000;
    ${theme.fonts.body1b};
  `,

  InfoSubtitle: css`
    display: flex;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    color: ${theme.colors.gray7};
  `,
};

const Middle = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    padding-left: 2.7rem;
    margin-bottom: 15rem;
  `,

  ExAttr: css`
    display: flex;
    margin-top: 3.8rem;
  `,

  ExAttrTitle: css`
    display: flex;
    color: ${theme.colors.gray8};
    ${theme.fonts.body1m};
  `,

  ExAttrList: css`
    display: flex;
    height: 3.7rem;
    color: ${theme.colors.black};
    ${theme.fonts.body2r};

    border-radius: 30px;
  `,

  InAttr: css`
    display: flex;
    margin-top: 3.8rem;
  `,

  InAttrTitle: css`
    display: flex;
    color: ${theme.colors.gray8};
    ${theme.fonts.body1m};
  `,

  InAttrList: css`
    display: flex;
    height: 3.7rem;
    color: ${theme.colors.black};
    ${theme.fonts.body2r};

    border-radius: 30px;
  `,

  Notice: css`
    display: flex;
    margin-top: 3.8rem;
  `,

  NoticeTitle: css`
    display: flex;
    color: ${theme.colors.gray8};
    ${theme.fonts.body1m};
  `,

  NoticeList: css`
    display: flex;
    height: 3.7rem;
    color: ${theme.colors.black};
    ${theme.fonts.body2r};

    border-radius: 30px;
  `,
};
