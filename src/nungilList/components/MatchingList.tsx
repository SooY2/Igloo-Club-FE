import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { ProfileDataTypesProps } from '../../common/type/ProfileDataTypesProps';
import instance from '../../common/apis/axiosInstanse';
import { theme } from '../../common/styles/theme';
import ProfileCard from '../../common/components/ProfileCard';

const MatchingList = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileDataTypesProps[]>([]);

  const handleMatchingList = async () => {
    try {
      const res = await instance.get('/api/nungil/nungils?status=MATCHED', {
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

  useEffect(() => {
    handleMatchingList();
  }, []);

  const ClickProfileBtn = (nungilId: number) => {
    navigate(`/finishmatch/${nungilId}`, { state: { nungilId } });
  };

  return (
    <div css={Container}>
      <div css={ProfileData}>
        <ProfileCard
          profileData={profileData}
          ClickProfileCard={ClickProfileBtn}
          nungilState="matching"
        />
      </div>
    </div>
  );
};

export default MatchingList;

const Container = css`
  position: absolute;
  top: 6.7rem;
  width: 100%;
  height: 100%;
  padding-bottom: 15rem;
  overflow-y: scroll;
  background: ${theme.colors.white};
`;

const ProfileData = css`
  display: flex;
  padding: 0 2.6rem;
  margin-top: 1.8rem;
`;
