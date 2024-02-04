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
import { ExtendedNavTypesProps } from '../types/navTypes';
import Radio from '../components/Radio';

const SNS계정 = ({
  onPrev,
  onNext,
  handleRegisterValue,
  registerValues,
}: ExtendedNavTypesProps) => {
  const [isActive, setIsActive] = useState(false);
  const [sns, setSNS] = useState(
    registerValues.contactKakao
      ? '카카오톡'
      : registerValues.contactInstagram
        ? '인스타그램'
        : '',
  );
  const [snsId, setSnsId] = useState(
    registerValues.contactKakao
      ? registerValues.contactKakao
      : registerValues.contactInstagram
        ? registerValues.contactInstagram
        : '',
  );

  useEffect(() => {
    if (sns && snsId) setIsActive(true);
    else setIsActive(false);
  }, [sns, snsId]);

  const handleSubmit = () => {
    if (handleRegisterValue) {
      if (sns === '카카오톡')
        handleRegisterValue({ ...registerValues, contactKakao: snsId });
      if (sns === '인스타그램')
        handleRegisterValue({ ...registerValues, contactInstagram: snsId });
    }
    onNext();
  };

  return (
    <>
      <RegisterHeader percent={70} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>상대방과 연락을 주고 받을 때 쓰일</St.Title>
            <St.Title>SNS 계정 아이디를 알려주세요</St.Title>
          </TitleBox>
          <div
            css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
          >
            <RegisterBasicInput label="SNS 계정 유형">
              <Radio
                name="sns"
                value1="카카오톡"
                value2="인스타그램"
                onRadioChange={setSNS}
                checkedValue={sns}
              />
            </RegisterBasicInput>

            <RegisterBasicInput label="SNS 계정 아이디">
              <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>@</div>
                <div
                  css={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.4rem',
                  }}
                >
                  <StCustomBasicInput
                    type="text"
                    placeholder="아이디를 정확히 입력해 주세요."
                    value={snsId}
                    onChange={(e) => setSnsId(e.target.value)}
                  />
                  <div
                    css={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.6rem',
                    }}
                  >
                    <StBasicInputExplain>
                      서로의 눈길이 매칭 되었을 시, 상대방에게 연락 수단으로
                      제공돼요.
                    </StBasicInputExplain>
                    <StBasicInputExplain>
                      회원가입 완료 후 언제든지 마이페이지에서 바꿀 수 있어요.
                    </StBasicInputExplain>
                  </div>
                </div>
              </div>
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

export default SNS계정;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;

const StCustomBasicInput = styled(StBasicInput)`
  width: 33rem;
`;
