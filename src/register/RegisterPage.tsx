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
  지역선택,
  시간선택,
  장소선택,
} from './funnelPages/0_index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Registertypes } from './types/registerTypes';
import { ScheduleTypes } from './types/scheduleTypes';
import instance from '../common/apis/axiosInstanse';

type StepType =
  | '약관동의'
  | '전화번호입력'
  | '전화번호인증'
  | '회사이메일입력'
  | '회사이메일인증'
  | '닉네임입력'
  | '성별생년월일'
  | 'SNS계정'
  | '기본프로필입력1'
  | '기본프로필입력2'
  | '지역선택'
  | '시간선택'
  | '장소선택';

const Register = () => {
  const navigate = useNavigate();
  // localStorage에서 상태를 불러오는 함수
  const loadStateFromLocalStorage = () => {
    const savedState = localStorage.getItem('STEP');
    if (!savedState) {
      navigate('/login');
      return '약관동의';
    }
    return savedState;
  };

  // useFunnel 사용 전에 state를 localStorage에서 불러옵니다.
  const initialState = loadStateFromLocalStorage();

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
      '지역선택',
      '시간선택',
      '장소선택',
    ] as const,
    initialState as StepType,
  );

  const [emailInfo, setEmailInfo] = useState<{
    email: string;
    companyName: string | string[] | number;
  }>({
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
      markerList: [],
    });
  const handleScheduleValue = (data: ScheduleTypes) => {
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
          <약관동의 onNext={() => setStep('전화번호입력')} percent={8} />
        </Funnel.Step>
        <Funnel.Step name="전화번호입력">
          <전화번호입력
            onPrev={() => setStep('약관동의')}
            onNext={() => setStep('전화번호인증')}
            setPhoneNum={setPhoneNum}
            percent={10}
          />
        </Funnel.Step>
        <Funnel.Step name="전화번호인증">
          <전화번호인증
            onPrev={() => setStep('전화번호입력')}
            onNext={() => {
              setStep('회사이메일입력');
              localStorage.setItem('STEP', '회사이메일입력');
            }}
            phoneNum={phoneNum}
            percent={20}
          />
        </Funnel.Step>
        <Funnel.Step name="회사이메일입력">
          <회사이메일입력
            onPrev={() => setStep('전화번호입력')}
            onNext={() => setStep('회사이메일인증')}
            setEmailInfo={setEmailInfo}
            percent={28}
          />
        </Funnel.Step>
        <Funnel.Step name="회사이메일인증">
          <회사이메일인증
            onPrev={() => setStep('회사이메일입력')}
            onNext={() => {
              setStep('닉네임입력');
              localStorage.setItem('STEP', '닉네임입력');
            }}
            emailInfo={emailInfo}
            percent={35}
          />
        </Funnel.Step>
        <Funnel.Step name="닉네임입력">
          <닉네임입력
            onPrev={() => setStep('회사이메일입력')}
            onNext={() => setStep('성별생년월일')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
            percent={43}
          />
        </Funnel.Step>
        <Funnel.Step name="성별생년월일">
          <성별생년월일
            onPrev={() => setStep('닉네임입력')}
            onNext={() => setStep('기본프로필입력1')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
            percent={50}
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
            percent={60}
          />
        </Funnel.Step>
        <Funnel.Step name="기본프로필입력2">
          <기본프로필입력2
            onPrev={() => setStep('기본프로필입력1')}
            onNext={() => {
              setStep('지역선택'), localStorage.setItem('STEP', '지역선택');
            }}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
            percent={75}
          />
        </Funnel.Step>
        <Funnel.Step name="지역선택">
          <지역선택
            onPrev={() => setStep('기본프로필입력2')}
            onNext={() => setStep('시간선택')}
            handleScheduleValue={handleScheduleValue}
            registerScheduleValues={registerScheduleValues}
            percent={85}
          />
        </Funnel.Step>
        <Funnel.Step name="시간선택">
          <시간선택
            onPrev={() => setStep('지역선택')}
            onNext={() => setStep('장소선택')}
            handleScheduleValue={handleScheduleValue}
            registerScheduleValues={registerScheduleValues}
            percent={90}
          />
        </Funnel.Step>
        <Funnel.Step name="장소선택">
          <장소선택
            onPrev={() => setStep('시간선택')}
            onNext={() => {
              submitScheduleValue();
            }}
            handleScheduleValue={handleScheduleValue}
            registerScheduleValues={registerScheduleValues}
            percent={100}
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
