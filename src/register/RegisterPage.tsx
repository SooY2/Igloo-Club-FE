import useFunnel from './hooks/useFunnel';
import styled from '@emotion/styled';

import {
  전화번호입력,
  전화번호인증,
  닉네임입력,
  성별생년월일,
  기본프로필입력1,
  FaceDepictionList,
  시간선택,
  장소선택,
  회원가입완료,
  PersonalityDepiction,
  HobbyList,
} from './funnelPages/0_index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Registertypes } from './types/registerTypes';
import { ScheduleTypes } from './types/scheduleTypes';

type StepType =
  | '전화번호입력'
  | '전화번호인증'
  | '닉네임입력'
  | '성별생년월일'
  | '기본프로필입력1'
  | 'FaceDepictionList'
  | 'PersonalityDepiction'
  | 'HobbyList'
  | '시간선택'
  | '장소선택'
  | '회원가입완료';

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
      '전화번호입력',
      '전화번호인증',
      '닉네임입력',
      '성별생년월일',
      '기본프로필입력1',
      'FaceDepictionList',
      'PersonalityDepiction',
      'HobbyList',
      '시간선택',
      '장소선택',
      '회원가입완료',
    ] as const,
    initialState as StepType,
  );

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
    hobbyList: [],
    disableCompany: false,
  });

  const handleRegisterValue = (data: Registertypes) => {
    setRegisterValues((prevValues) => ({
      ...prevValues,
      ...data,
    }));
  };
  //특성 선택 핸들러
  const handleValues = (value: string | string[], name?: string) => {
    if (!name) return;
    setRegisterValues((prevValues) => ({
      ...prevValues,
      [name]: value,
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

  return (
    <RagisterLayout>
      <Funnel>
        <Funnel.Step name="전화번호입력">
          <전화번호입력
            onNext={() => setStep('전화번호인증')}
            setPhoneNum={setPhoneNum}
            percent={20}
          />
        </Funnel.Step>
        <Funnel.Step name="전화번호인증">
          <전화번호인증
            onPrev={() => setStep('전화번호입력')}
            onNext={() => {
              setStep('닉네임입력');
              localStorage.setItem('STEP', '회사이메일입력');
            }}
            phoneNum={phoneNum}
            percent={30}
          />
        </Funnel.Step>
        <Funnel.Step name="닉네임입력">
          <닉네임입력
            onPrev={() => setStep('전화번호인증')}
            onNext={() => setStep('성별생년월일')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
            percent={40}
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
        <Funnel.Step name="기본프로필입력1">
          <기본프로필입력1
            onPrev={() => setStep('닉네임입력')}
            onNext={() => setStep('FaceDepictionList')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
            percent={60}
          />
        </Funnel.Step>
        <Funnel.Step name="FaceDepictionList">
          <FaceDepictionList
            values={registerValues.faceDepictionList}
            handleValues={handleValues}
            onPrev={() => setStep('닉네임입력')}
            onNext={() => setStep('PersonalityDepiction')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
            percent={70}
          />
        </Funnel.Step>
        <Funnel.Step name="PersonalityDepiction">
          <PersonalityDepiction
            values={registerValues.personalityDepictionList}
            handleValues={handleValues}
            onPrev={() => setStep('FaceDepictionList')}
            onNext={() => setStep('HobbyList')}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
            percent={80}
          />
        </Funnel.Step>
        <Funnel.Step name="HobbyList">
          <HobbyList
            values={registerValues.hobbyList}
            handleValues={handleValues}
            onPrev={() => setStep('PersonalityDepiction')}
            onNext={() => {
              setStep('시간선택');
            }}
            handleRegisterValue={handleRegisterValue}
            registerValues={registerValues}
            percent={90}
          />
        </Funnel.Step>
        <Funnel.Step name="시간선택">
          <시간선택
            onPrev={() => setStep('HobbyList')}
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
              setStep('회원가입완료'), localStorage.setItem('STEP', '가입완료');
            }}
            registerScheduleValues={registerScheduleValues}
            percent={100}
          />
        </Funnel.Step>
        <Funnel.Step name="회원가입완료">
          <회원가입완료
            onNext={() => {
              navigate('/main-page');
            }}
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

  /* height: calc(var(--vh, 1vh) * 100); */
  height: 100%;
  padding: 0 2rem;
  overflow: hidden;
`;
