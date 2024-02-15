import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { ProfileDataTypesProps } from '../../common/type/ProfileDataTypesProps';
import instance from '../../common/apis/axiosInstanse';
import { theme } from '../../common/styles/theme';
import ProfileCard from '../../common/components/ProfileCard';

const SendNungil = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileDataTypesProps[]>([]);

  const handleSendNungil = async () => {
    try {
      const res = await instance.get('/api/nungil/nungils?status=SENT', {
        params: {
          page: 0,
          size: 10,
        },
      });

      console.log('내가 보낸 눈길 : ', res.data.content);

      setProfileData(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleSendNungil();
  }, []);

  const ClickProfileBtn = (nungilId: number) => {
    navigate(`/senddetailpage/${nungilId}`, { state: { nungilId } });
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

export default SendNungil;

const Container = css`
  width: 100%;
  padding-bottom: 15rem;
  background: ${theme.colors.white};
`;

const ProfileData = css`
  display: flex;
  padding: 0 2.6rem;
  margin-top: 1.8rem;
`;
