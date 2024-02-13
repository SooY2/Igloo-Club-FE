import useFunnel from './hooks/useFunnel';
import styled from '@emotion/styled';

import {
  약관동의,
  전화번호입력,
  전화번호인증,
  회사이메일입력,
  회사이메일인증,
  닉네임입력,
  성별생년월일,
  // SNS계정,
  기본프로필입력1,
  기본프로필입력2,
  장소선택,
  시간선택,
} from './funnelPages/0_index';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Registertypes } from './types/registerTypes';
import { ScheduleTypes } from './types/scheduleTypes';
import instance from '../common/apis/axiosInstanse';

const Register = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [Funnel, setStep] = useFunnel(
    [
      '약관동의',
      '전화번호입력',
      '전화번호인증',
      '회사이메일입력',
      '회사이메일인증',
      '닉네임입력',
      '성별생년월일',
      'SNS계정',
      '기본프로필입력1',
      '기본프로필입력2',
      '장소선택',
      '시간선택',
    ] as const,
    state,
  );

  const [emailInfo, setEmailInfo] = useState({
    email: '',
    companyName: '',
  });

  const [phoneNum, setPhoneNum] = useState('');

  const [registerValues, setRegisterValues] = useState<Registertypes>({
    nickname: '',
    sex: '',
    birthdate: '',
    contactKakao: null,
    contactInstagram: null,
    animalFace: '',
    job: '',
    height: '',
    mbti: '',
    marriageState: '',
    religion: '',
    alcohol: '',
    smoke: '',
    faceDepictionList: [],
    personalityDepictionList: [],
    description: '',
    markerList: [],
    hobbyList: [],
  });

  const handleRegisterValue = (data: Registertypes) => {
    setRegisterValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };

  //장소시간선택 데이터
  const [registerScheduleValues, setRegisterScheduleValues] =
    useState<ScheduleTypes>({
      location: '',
      yoilList: [],
      availableTimeList: [],
      markerList: ['PANGYO_STATION_SQUARE'],
    });
  const handleScheduleValue = (data: Registertypes) => {
    setRegisterScheduleValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };
  const submitScheduleValue = async () => {
    try {
      await instance.patch('api/member/schedule', registerScheduleValues);
      navigate('/main-page');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <RagisterLayout>
      <Funnel>
        <Funnel.Step name="약관동의">
          <약관동의 onNext={() => setStep('전화번호입력')} />
        </Funnel.Step>
        <Funnel.Step name="전화번호입력">
          <전화번호입력
            onPrev={() => setStep('약관동의')}
            onNext={() => setStep('전화번호인증')}
            setPhoneNum={setPhoneNum}
          />
        </Funnel.Step>
        <Funnel.Step name="전화번호인증">
          <전화번호인증
            onPrev={() => setStep('전화번호입력')}
            onNext={() => setStep('회사이메일입력')}
            phoneNum={phoneNum}
          />
        </Funnel.Step>
        <Funnel.Step name="회사이메일입력">
          <회사이메일입력
            onPrev={() => setStep('전화번호입력')}
            onNext={() => setStep('회사이메일인증')}
            setEmailInfo={setEmailInfo}
          />
        </Funnel.Step>
        <Funnel.Step name="회사이메일인증">
          <회사이메일인증
            onPrev={() => setStep('회사이메일입력')}
            onNext={() => setStep('닉네임입력')}
            emailInfo={emailInfo}
          />
        </Funnel.Step>
        <Funnel.Step name="닉네임입력">
          <닉네임입력
            onPrev={() => setStep('회사이메일입력')}
            onNext={() => setStep('성별생년월일')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
          />
        </Funnel.Step>
        <Funnel.Step name="성별생년월일">
          <성별생년월일
            onPrev={() => setStep('닉네임입력')}
            onNext={() => setStep('기본프로필입력1')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
          />
        </Funnel.Step>
        {/* <Funnel.Step name="SNS계정">
          <SNS계정
            onPrev={() => setStep('성별생년월일')}
            onNext={() => setStep('기본프로필입력1')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
          />
        </Funnel.Step> */}
        <Funnel.Step name="기본프로필입력1">
          <기본프로필입력1
            onPrev={() => setStep('닉네임입력')}
            onNext={() => setStep('기본프로필입력2')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
          />
        </Funnel.Step>
        <Funnel.Step name="기본프로필입력2">
          <기본프로필입력2
            onPrev={() => setStep('기본프로필입력1')}
            onNext={() => setStep('장소선택')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
          />
        </Funnel.Step>
        <Funnel.Step name="장소선택">
          <장소선택
            onPrev={() => setStep('기본프로필입력2')}
            onNext={() => setStep('시간선택')}
            handleScheduleValue={handleScheduleValue}
            registerScheduleValues={registerScheduleValues}
          />
        </Funnel.Step>
        <Funnel.Step name="시간선택">
          <시간선택
            onPrev={() => setStep('장소선택')}
            onNext={() => {
              submitScheduleValue();
            }}
            handleScheduleValue={handleScheduleValue}
            registerScheduleValues={registerScheduleValues}
          />
        </Funnel.Step>
      </Funnel>
    </RagisterLayout>
  );
};

export default Register;

const RagisterLayout = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 2.5rem 2rem 3.3rem;
`;
