import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import AnimalProfile from './AnimalProfile';
import { Watch } from '../assets/svgs';
import { ProfileDataTypesProps } from '../type/ProfileDataTypesProps';

export const shortenWords = (description: string, length = 300) => {
  let result = '';
  if (description.length > length) {
    result = description.substring(0, length - 2) + '...';
  } else {
    result = description;
  }
  return result;
};

export const calculateDday = (expiredAt: string) => {
  const today = new Date();
  const expirationDate = new Date(expiredAt);
  const timeDiff = expirationDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysDiff;
};

const ProfileCard = ({
  profileData,
  ClickProfileCard,
  nungilState,
}: {
  profileData: ProfileDataTypesProps[] | null;
  ClickProfileCard: (nungilId: number, nickname: string) => void;
  nungilState: string;
}) => {
  const detailbtn = '상세 프로필 보기 >';

  return (
    <div css={Container}>
      {profileData &&
        profileData.map((profile) => (
          <StProfileWrapper
            key={profile.nungilId}
            animalFace={profile.animalFace}
            onClick={() => ClickProfileCard(profile.nungilId, profile.nickname)}
          >
            <div css={Profile.Top}>
              <AnimalProfile animalFace={profile.animalFace} />
              <div css={Profile.Detail}>
                <span css={Profile.CompanyName}>{profile.companyName}</span>
                <span css={Profile.Job}>{profile.job}</span>
              </div>
            </div>
            <div css={Profile.DescriptionBox}>
              <span>{shortenWords(profile.description)}</span>
            </div>
            {nungilState === 'received' || nungilState === 'sent' ? (
              <StDdaySection>
                <Watch />
                <span>
                  프로필 삭제까지 D-{calculateDday(profile.expiredAt)}
                </span>
                <StDetailBtn>{detailbtn}</StDetailBtn>
              </StDdaySection>
            ) : null}
          </StProfileWrapper>
        ))}
    </div>
  );
};

export default ProfileCard;

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  width: 100%;
  background: ${theme.colors.white};
`;

const StProfileWrapper = styled.div<{ animalFace: string }>`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 34rem;
  padding: 2.5rem 2.7rem;
  line-height: 2rem;
  color: ${theme.colors.white};
  ${theme.fonts.body2b}

  background: ${(props) =>
    props.animalFace === '여우상'
      ? '#FF9052'
      : props.animalFace === '강아지상'
        ? '#E5A582'
        : props.animalFace === '토끼상'
          ? '#F27D72'
          : props.animalFace === '공룡상'
            ? '#66CB9B'
            : props.animalFace === '사슴상'
              ? '#F3AB72'
              : props.animalFace === '늑대상'
                ? '#939DF9'
                : props.animalFace === '말상'
                  ? '#FF9E88'
                  : props.animalFace === '고양이상'
                    ? '#FFC159'
                    : props.animalFace === '곰상'
                      ? '#C48A86'
                      : ''};
  border-radius: 15px;
`;

const Profile = {
  Top: css`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: start;
  `,

  Detail: css`
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
  `,

  CompanyName: css`
    font-size: 1.4rem;
    font-weight: 600;
    color: ${theme.colors.white};
  `,

  Job: css`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${theme.colors.white};
  `,

  DescriptionBox: css`
    overflow: hidden;
    font-size: 1.5rem;
    font-weight: 500;
    line-height: 2.3rem;
    text-overflow: ellipsis;
    white-space: nowrap;
  `,
};

const StDdaySection = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.7rem;
  align-items: center;
  width: 100%;
  padding-top: 1.5rem;
  margin-top: 2rem;
  ${({ theme }) => theme.fonts.body3};
`;

const StDetailBtn = styled.p`
  margin-left: 8.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray0};
  text-align: center;
  letter-spacing: -0.3px;
`;
