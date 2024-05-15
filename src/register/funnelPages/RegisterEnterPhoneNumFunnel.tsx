import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import onlyAbleNumber from '../../common/utils/onlyAbleNumber';
import instance from '../../common/apis/axiosInstanse';
import axios from 'axios';
import { Registertypes } from '../types/registerTypes';

export interface PhoneNumProps {
  onNext: () => void;
  percent: number;
  setPhoneNum: Dispatch<SetStateAction<string>>;
  handleRegisterValue?: (data: Registertypes) => void;
}

const 전화번호입력 = ({ onNext, setPhoneNum }: PhoneNumProps) => {
  const [isActive, setIsActive] = useState(false);
  const [thisPhoneNum, thisSetPhoneNum] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (thisPhoneNum.length === 11) setIsActive(true);
    else setIsActive(false);
  }, [thisPhoneNum]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await instance.post('api/member/phone/authentication', {
        phoneNumber: thisPhoneNum,
      });
      setPhoneNum(thisPhoneNum);
      onNext();
    } catch (error: unknown) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.code === 'DUPLICATED_PHONENUMBER')
          alert('이미 등록된 전화번호입니다.');
        if (error.response?.data?.code === 'REDIS_NOT_FOUND')
          alert('인증번호가 만료되었습니다.');
        if (error.response?.data?.code === 'WRONG_AUTH_CODE')
          alert('인증번호가 틀렸습니다.');
      } else {
        console.log('An unexpected error occurred:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <RegisterHeader percent={20} isFirst={true} />
      {isLoading ? (
        <>인증번호 가는중,,</>
      ) : (
        <article css={St.articleStyles}>
          <section css={St.sectionStyles}>
            <TitleBox>
              <St.Title>간편한 알림 서비스를 제공하기 위해 </St.Title>
              <St.Title>회원님의 전화번호가 필요해요</St.Title>
            </TitleBox>

            <RegisterBasicInput label="휴대폰 번호">
              <StBasicInput
                type="text"
                placeholder="휴대폰 번호를 띄어쓰기 없이 입력해 주세요"
                value={thisPhoneNum}
                onChange={(e) =>
                  thisSetPhoneNum(onlyAbleNumber(e.target.value))
                }
              />
            </RegisterBasicInput>
          </section>
          <RegisterBtn
            subContent="모든 개인정보는 축제 이후 일괄 삭제 돼요."
            isActive={isActive}
            content="다음으로"
            onClick={handleSubmit}
          />
        </article>
      )}
    </>
  );
};

export default 전화번호입력;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;
