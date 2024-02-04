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

      console.log('매칭 내역 : ', res.data.content);

      setProfileData(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleMatchingList();
  }, []);

  const ClickProfileBtn = (nungilId: number) => {
    navigate('/finishmatch', { state: { nungilId } });
  };

  return (
    <div css={Container}>
      <div css={ProfileData}>
        <ProfileCard
          profileData={profileData}
          ClickProfileCard={ClickProfileBtn}
        />
      </div>
    </div>
  );
};

export default MatchingList;

const Container = css`
  width: 100%;
  background: ${theme.colors.white};
`;

const ProfileData = css`
  display: flex;
  padding-left: 2.6rem;
  margin-top: 1.8rem;
`;
