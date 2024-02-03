import { css } from '@emotion/react';
import { theme } from '../styles/theme';
import { ProfileDataTypesProps } from '../../main/types/ProfileDataTypesProps';

const ProfileCard = ({
  profileData,
  ClickProfileCard,
}: {
  profileData: ProfileDataTypesProps[] | null;
  ClickProfileCard: (nungilId: number) => void;
}) => {
  // const [text, setText] = useState('');
  // const textarea = useRef(null);

  return (
    <div css={Container}>
      {profileData.map((profile) => (
        <div
          key={profile.nungilId}
          css={Profile}
          onClick={() => ClickProfileCard(profile.nungilId)}
        >
          <img />
          <div css={ProfileDetail}>
            <span>{profile.companyName}</span>
            <span>{profile.job}</span>
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
`;

const Profile = css`
  display: flex;
  flex-direction: row;
  padding-top: 2.4rem;
  padding-bottom: 2.9rem;
  padding-left: 2.3rem;
  color: ${theme.colors.white};
  background: linear-gradient(116deg, #ff6264 0%, #ffa490 96.79%);
  ${theme.fonts.body2b};

  border-radius: 15px;
`;

const ProfileDetail = css`
  display: flex;
  flex-direction: column;
`;
