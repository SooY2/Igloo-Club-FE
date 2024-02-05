import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { ProfileDataTypesProps } from '../../common/type/ProfileDataTypesProps';
import instance from '../../common/apis/axiosInstanse';
import { theme } from '../../common/styles/theme';
import ProfileCard from '../../common/components/ProfileCard';

const ReceivedNungil = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileDataTypesProps[]>([]);

  const handleReceivedNungil = async () => {
    try {
      const res = await instance.get('/api/nungil/nungils?status=RECEIVED', {
        params: {
          page: 0,
          size: 10,
        },
      });

      console.log(res.data.content);

      setProfileData(res.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleReceivedNungil();
  }, []);

  const ClickProfileBtn = (nungilId: number) => {
    navigate('/receiveddetailpage', { state: { nungilId } });
  };

  return (
    <div css={Container}>
      <div css={NotifyDate}>
        <span>내가 받은 눈길 내역은 받은 날부터</span>
        <span css={NotifyBold}>7일</span>
        <span>만 열람 가능해요</span>
      </div>
      <div css={ProfileData}>
        <ProfileCard
          profileData={profileData}
          ClickProfileCard={ClickProfileBtn}
        />
      </div>
    </div>
  );
};

export default ReceivedNungil;

const Container = css`
  width: 100%;
  background: ${theme.colors.white};
`;

const NotifyDate = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3rem;
  font-size: 11px;
  font-style: normal;
  font-weight: 600;
  text-align: center;
  background: ${theme.colors.gray0};
`;

const NotifyBold = css`
  padding-left: 0.3rem;
  color: ${theme.colors.primary};
`;

const ProfileData = css`
  display: flex;
  padding-left: 2.6rem;
  margin-top: 1.8rem;
`;
