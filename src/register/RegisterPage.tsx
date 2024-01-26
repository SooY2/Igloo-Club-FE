import useFunnel from './hooks/useFunnel';
import styled from '@emotion/styled';

import {
  약관동의,
  전화번호입력,
  전화번호인증,
  회사이메일인증,
  닉네임입력,
  성별생년월일,
  SNS계정,
  기본프로필입력1,
  기본프로필입력2,
} from './funnelPages/0_index';

const Register = () => {
  const [퍼널, setStep] = useFunnel(
    [
      '약관동의',
      '전화번호입력',
      '전화번호인증',
      '회사이메일인증',
      '닉네임입력',
      '성별생년월일',
      'SNS계정',
      '기본프로필입력1',
      '기본프로필입력2',
    ] as const,
    '전화번호인증',
  );
  return (
    <RagisterLayout>
      <퍼널>
        <퍼널.Step name="약관동의">
          <약관동의 onNext={() => setStep('전화번호입력')} />
        </퍼널.Step>
        <퍼널.Step name="전화번호입력">
          <전화번호입력
            onPrev={() => setStep('약관동의')}
            onNext={() => setStep('전화번호인증')}
          />
        </퍼널.Step>
        <퍼널.Step name="전화번호인증">
          <전화번호인증
            onPrev={() => setStep('전화번호입력')}
            onNext={() => setStep('회사이메일인증')}
          />
        </퍼널.Step>
        <퍼널.Step name="회사이메일인증">
          <회사이메일인증 onNext={() => setStep('닉네임입력')} />
        </퍼널.Step>
        <퍼널.Step name="닉네임입력">
          <닉네임입력 onNext={() => setStep('성별생년월일')} />
        </퍼널.Step>
        <퍼널.Step name="성별생년월일">
          <성별생년월일 onNext={() => setStep('SNS계정')} />
        </퍼널.Step>
        <퍼널.Step name="SNS계정">
          <SNS계정 onNext={() => setStep('기본프로필입력1')} />
        </퍼널.Step>
        <퍼널.Step name="기본프로필입력1">
          <기본프로필입력1 onNext={() => setStep('기본프로필입력2')} />
        </퍼널.Step>
        <퍼널.Step name="기본프로필입력2">
          <기본프로필입력2 />
        </퍼널.Step>
      </퍼널>
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
