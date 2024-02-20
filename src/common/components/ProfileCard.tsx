import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../styles/theme';
import AnimalProfile from './AnimalProfile';
import { Watch } from '../assets/svgs';
import { ProfileDataTypesProps } from '../type/ProfileDataTypesProps';

export const shortenWords = (str: string, length = 300) => {
  let result = '';
  if (str.length > length) {
    result = str.substring(0, length - 2) + '...';
  } else {
    result = str;
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
  return (
    <div css={Container}>
      {profileData &&
        profileData.map((profile) => (
          <div
            key={profile.nungilId}
            css={Profile.Wrapper}
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
              </StDdaySection>
            ) : null}
          </div>
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

const Profile = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 34rem;
    padding: 2.5rem 2.7rem;
    line-height: 2rem;
    color: ${theme.colors.white};
    ${theme.fonts.body2b}

    background: linear-gradient(116deg, #ff6264 0%, #ffa490 96.79%);
    border-radius: 15px;
  `,

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
    color: ${theme.colors.gray0};
  `,

  Job: css`
    font-size: 1.2rem;
    font-weight: 500;
    color: ${theme.colors.gray2};
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
  ${({ theme }) => theme.fonts.body3}
`;
