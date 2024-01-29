import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import onlyAbleNumber from '../../common/utils/onlyAbleNumber';
import { NavTypesProps } from '../types/navTypes';

const 전화번호입력 = ({ onPrev, onNext }: NavTypesProps) => {
  const [isActive, setIsActive] = useState(false);
  const [mobileCarrier, setMobileCarrier] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  useEffect(() => {
    if (mobileCarrier && phoneNum) setIsActive(true);
    else setIsActive(false);
  }, [mobileCarrier, phoneNum]);

  const handleSubmit = () => {
    //서버통신
    onNext();
  };

  return (
    <>
      <RegisterHeader percent={20} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>간편한 알림 서비스를 제공하기 위해</St.Title>
            <St.Title>회원님의 전화번호가 필요해요</St.Title>
          </TitleBox>
          <div
            css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
          >
            <RegisterBasicInput label="통신사">
              <StBasicInput
                type="text"
                placeholder="통신사를 선택해 주세요."
                value={mobileCarrier}
                onChange={(e) => {
                  setMobileCarrier(e.target.value);
                }}
              />
            </RegisterBasicInput>
            <RegisterBasicInput
              label="휴대폰 번호"
              explain="카카오톡 메세지를 통해 발송되는 인증번호를 확인하세요"
            >
              <StBasicInput
                type="text"
                placeholder="휴대폰 번호를 띄어쓰기 없이 입력해 주세요"
                value={phoneNum}
                onChange={(e) => setPhoneNum(onlyAbleNumber(e.target.value))}
              />
            </RegisterBasicInput>
          </div>
        </section>
        <RegisterBtn
          isActive={isActive}
          content="다음으로"
          onClick={handleSubmit}
        />
      </article>
    </>
  );
};

export default 전화번호입력;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;
