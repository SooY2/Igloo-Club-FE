import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import {
  StBasicInput,
  StBasicInputExplain,
} from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import onlyAbleNumber from '../../common/utils/onlyAbleNumber';
import { NavTypesProps } from '../types/navTypes';
import { css } from '@emotion/react';
import useRegisterTimer from '../hooks/useRegisterTimer';
import instance from '../../common/apis/axiosInstanse';
import axios from 'axios';

interface PhoneNumProps extends NavTypesProps {
  phoneNum: string;
}

const 전화번호인증 = ({ onPrev, onNext, phoneNum }: PhoneNumProps) => {
  const [isActive, setIsActive] = useState(false);
  const [authentication, setAuthentication] = useState('');

  useEffect(() => {
    if (authentication) setIsActive(true);
    else setIsActive(false);
  }, [authentication]);

  const handleSubmit = async () => {
    try {
      await instance.post('/api/member/phone/verification', {
        code: authentication,
        phoneNumber: phoneNum,
      });
      onNext();
    } catch (error: unknown) {
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
    }
  };

  //인증번호 재정송
  const handleReRequest = () => {
    onPrev();
  };

  return (
    <>
      <RegisterHeader percent={30} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>카카오톡으로 인증번호를 발송했어요</St.Title>
            <St.Title>인증번호를 입력해 주세요</St.Title>
          </TitleBox>
          <div css={{ display: 'flex', flexDirection: 'column' }}>
            <RegisterBasicInput label="인증번호">
              <div css={timerInputStyles}>
                <StBasicInput
                  type="text"
                  placeholder="발송된 인증번호를 입력해 주세요"
                  value={authentication}
                  onChange={(e) =>
                    setAuthentication(onlyAbleNumber(e.target.value))
                  }
                />
                <StRegisterTimer>{useRegisterTimer(300)}</StRegisterTimer>
              </div>
            </RegisterBasicInput>
            <div
              css={{ display: 'flex', alignItems: 'center ', gap: '0.7rem' }}
            >
              <StBasicInputExplain>
                인증 메세지가 오지 않나요?
              </StBasicInputExplain>
              <StRequest onClick={handleReRequest}>인증번호 재전송</StRequest>
            </div>
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

export default 전화번호인증;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;

const StRequest = styled.p`
  color: ${({ theme }) => theme.colors.black};
  text-decoration: underline;
  ${({ theme }) => theme.fonts.body3};

  &:active {
    color: ${({ theme }) => theme.colors.pressed_primary};
  }
`;

const timerInputStyles = css`
  position: relative;
  width: 100%;
`;

const StRegisterTimer = styled.p`
  position: absolute;
  top: 0;
  right: 0.5rem;
  color: ${({ theme }) => theme.colors.warning_red};
  ${({ theme }) => theme.fonts.body2b};
`;
