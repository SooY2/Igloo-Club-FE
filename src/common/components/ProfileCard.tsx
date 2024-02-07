import { css } from '@emotion/react';
import { theme } from '../styles/theme';
import AnimalProfile from './AnimalProfile';
import { ProfileDataTypesProps } from '../type/ProfileDataTypesProps';

const ProfileCard = ({
  profileData,
  ClickProfileCard,
}: {
  profileData: ProfileDataTypesProps[] | null;
  ClickProfileCard: (nungilId: number, nickname: string) => void;
}) => {
  return (
    <div css={Container}>
      {profileData.map((profile) => (
        <div
          key={profile.nungilId}
          css={Profile.Wrapper}
          onClick={() => ClickProfileCard(profile.nungilId, profile.nickname)}
        >
          <div css={Profile.Top}>
            <AnimalProfile animalFace={profile.animalFace} />
            <div css={Profile.Detail}>
              <span>{profile.companyName}</span>
              <span>{profile.job}</span>
            </div>
          </div>
          <div>
            <span>{profile.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;

const Container = css`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  align-items: center;
  width: 100%;
  background: ${theme.colors.white};
`;

const Profile = {
  Wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: 34rem;
    padding: 2.4rem 2.6rem 2.9rem;
    line-height: 2rem;
    color: ${theme.colors.white};
    ${theme.fonts.body2b}

    background: linear-gradient(116deg, #ff6264 0%, #ffa490 96.79%);
    border-radius: 15px;
  `,

  Top: css`
    display: flex;
    flex-direction: row;
    gap: 10px;
  `,

  Detail: css`
    display: flex;
    flex-direction: column;
    gap: 2px;
  `,
};
