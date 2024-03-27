/** 프로필 상세 페이지 **/

import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '../styles/theme';
import instance from '../apis/axiosInstanse';
import { useParams } from 'react-router-dom';
import { DETAILPROFILETYPE } from '../type/detailPropfileType';
import {
  Fox,
  Dog,
  Rabbit,
  Dino,
  Deer,
  Wolf,
  Horse,
  Cat,
  Bear,
} from '../assets/svgs/index';

const DetailProfile = () => {
  const { nungilId } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileData, setProfileData] = useState<DETAILPROFILETYPE>();
  const [isLoading, setIsLoading] = useState(false);
  const nickname = profileData?.nickname || '';

  const genderText = profileData?.sex === 'MALE' ? '남성' : '여성';

  const context = `#${profileData?.companyName.replace(/\s+/g, '_')} 에 재직 중인\n 
  #${profileData?.age}세 ${genderText}이고 #${profileData?.job.replace(/\s+/g, '_')}\n 
  얼굴은 #${profileData?.animalFace} 
  키는 #${profileData?.height}cm\n 성격 유형은 #${profileData?.mbti}`;

  let AnimalFace, AnimalFaceImg;

  useEffect(() => {
    const handleGetDetailProfile = async () => {
      try {
        setIsLoading(true);
        setIsLoading(true);
        const res = await instance.get('/api/nungil/detail', {
          params: {
            nungilId: nungilId,
          },
        });

        setProfileData(res.data);

        console.log(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleGetDetailProfile();
  }, [nungilId]);

  const handleLastWord = (lastChar: string) => {
    const uni = lastChar.charCodeAt(0);

    if (uni < 44032 || uni > 55203) return null;

    return (uni - 44032) % 28 != 0;
  };

  const title = `안녕하세요!\n 저는 ${
    handleLastWord(nickname.slice(-1)) ? `${nickname}이` : `${nickname}`
  }라고 합니다.`;

  switch (profileData?.animalFace) {
    case '여우상':
      AnimalFaceImg = <Fox />;
      AnimalFace = '여우상';
      break;
    case '강아지상':
      AnimalFaceImg = <Dog />;
      AnimalFace = '강아지상';
      break;
    case '토끼상':
      AnimalFaceImg = <Rabbit />;
      AnimalFace = '토끼상';
      break;
    case '공룡상':
      AnimalFaceImg = <Dino />;
      AnimalFace = '공룡상';
      break;
    case '사슴상':
      AnimalFaceImg = <Deer />;
      AnimalFace = '사슴상';
      break;
    case '늑대상':
      AnimalFaceImg = <Wolf />;
      AnimalFace = '늑대상';
      break;
    case '말상':
      AnimalFaceImg = <Horse />;
      AnimalFace = '말상';
      break;
    case '고양이상':
      AnimalFaceImg = <Cat />;
      AnimalFace = '고양이상';
      break;
    case '곰상':
      AnimalFaceImg = <Bear />;
      AnimalFace = '곰상';
      break;
    case 'FOX':
      AnimalFace = <Fox />;
      break;
    case 'DOG':
      AnimalFace = <Dog />;
      break;
    case 'RABBIT':
      AnimalFace = <Rabbit />;
      break;
    case 'DINO':
      AnimalFace = <Dino />;
      break;
    case 'DEER':
      AnimalFace = <Deer />;
      break;
    case 'WOLF':
      AnimalFace = <Wolf />;
      break;
    case 'HORSE':
      AnimalFace = <Horse />;
      break;
    case 'CAT':
      AnimalFace = <Cat />;
      break;
    case 'BEAR':
      AnimalFace = <Bear />;
      break;
    default:
      break;
  }

  return isLoading ? (
    <>Loading,,</>
  ) : (
    <div css={Container}>
      <div css={Top.Wrapper}>
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
          <div css={Top.InfoContent}>
            <span>{profileData?.description}</span>
          </div>
        </div>
      </div>
      <div css={Middle.Wrapper}>
        <div css={Middle.ExAttr}>
          <div css={Middle.ExAttrTitle}>
            <span>나의 외적인 매력은</span>
          </div>
          <div css={Middle.ExAttrList}>
            <div css={Middle.AllocationList}>
              <StAnimalFaceImg>{AnimalFaceImg}</StAnimalFaceImg> {AnimalFace}
            </div>
            {profileData?.faceDepictionAllocationList &&
              profileData.faceDepictionAllocationList
                .split(',')
                .map((attr: string, index: number) => (
                  <div key={index} css={Middle.AllocationList}>
                    {attr.trim()}
                  </div>
                ))}
          </div>
        </div>
        <div css={Middle.InAttr}>
          <div css={Middle.InAttrTitle}>
            <span>나의 내적인 매력은</span>
          </div>
          <div css={Middle.InAttrList}>
            <div css={Middle.AllocationList}>
              {profileData?.mbti && profileData.mbti}
            </div>
            {profileData?.personalityDepictionAllocationList &&
              profileData.personalityDepictionAllocationList
                .split(',')
                .map((attr: string, index: number) => (
                  <div key={index} css={Middle.AllocationList}>
                    {attr.trim()}
                  </div>
                ))}
          </div>
        </div>
        <div css={Middle.Hobby}>
          <div css={Middle.HobbyTitle}>
            <span>나의 취미는</span>
          </div>
          <div css={Middle.HobbyList}>
            {profileData?.hobbyAllocationList &&
              profileData.hobbyAllocationList
                .split(',')
                .map((attr: string, index: number) => (
                  <div key={index} css={Middle.AllocationList}>
                    {attr.trim()}
                  </div>
                ))}
          </div>
        </div>
        <div css={Middle.Notice}>
          <div css={Middle.NoticeTitle}>
            <span>이건 알아두세요!</span>
          </div>
          <div css={Middle.NoticeList}>
            <div css={Middle.AllocationList}>
              {profileData?.marriageState && profileData.marriageState}
            </div>
            <div css={Middle.AllocationList}>
              {profileData?.religion && profileData.religion}
            </div>
            <div css={Middle.AllocationList}>
              {profileData?.smoke && profileData.smoke}
            </div>
            <div css={Middle.AllocationList}>
              음주 : {profileData?.alcohol && profileData.alcohol}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProfile;

const highlightKeywords = (line: string) => {
  return (
    <div>
      {line.split(/(#[^\s]+)/).map((part, index) =>
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
  padding-top: 1.5rem;
  overflow-y: scroll;
  background-color: ${theme.colors.white};
`;

const Top = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0 2.7rem;
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
    font-weight: 700;
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
    ${theme.fonts.subtitle2b};
  `,

  InfoBox: css`
    display: flex;
    flex-direction: column;
    min-width: 30rem;
    padding: 2.2rem 3rem 2.3rem 2.3rem;
    background-color: ${theme.colors.gray0};
    border-radius: 10px;
  `,

  InfoTitle: css`
    display: flex;
    color: #000;
    ${theme.fonts.body1b};
  `,

  InfoContent: css`
    display: flex;
    padding-top: 1.3rem;
    font-size: 1.3rem;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    line-height: 2rem;
    color: ${theme.colors.gray7};
  `,
};

const StAnimalFaceImg = styled.div`
  svg {
    display: flex;
    align-items: center;
    width: 2rem;
    height: 100%;
  }
`;

const Middle = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    padding: 0 2.7rem;
    margin-bottom: 15rem;
  `,

  ExAttr: css`
    display: flex;
    flex-direction: column;
    margin-top: 3.8rem;
  `,

  ExAttrTitle: css`
    display: flex;
    color: ${theme.colors.gray8};
    ${theme.fonts.body1m};
  `,

  ExAttrList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.2rem;
    white-space: nowrap;
  `,

  InAttr: css`
    display: flex;
    flex-direction: column;
    margin-top: 3.8rem;
  `,

  InAttrTitle: css`
    display: flex;
    color: ${theme.colors.gray8};
    ${theme.fonts.body1m};
  `,

  InAttrList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.2rem;
    white-space: nowrap;
  `,

  Hobby: css`
    display: flex;
    flex-direction: column;
    margin-top: 3.8rem;
  `,

  HobbyTitle: css`
    display: flex;
    color: ${theme.colors.gray8};
    ${theme.fonts.body1m};
  `,

  HobbyList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.2rem;
    white-space: nowrap;
  `,

  Notice: css`
    display: flex;
    flex-direction: column;
    margin-top: 3.8rem;
  `,

  NoticeTitle: css`
    display: flex;
    color: ${theme.colors.gray8};
    ${theme.fonts.body1m};
  `,

  NoticeList: css`
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 1.2rem;
    white-space: nowrap;
  `,

  AllocationList: css`
    display: inline-flex;
    gap: 0.7rem;
    align-items: center;
    justify-content: center;
    padding: 1rem 1.5rem 0.9rem;
    color: ${theme.colors.black};
    ${theme.fonts.body2r};

    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray3};
    border-radius: 30px;
  `,
};
