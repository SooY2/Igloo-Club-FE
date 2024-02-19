import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import { StBasicInput, StErrorExplain } from '../styles/registerInputStyles';
import { RegisterBasicInput } from '../components/RegisterInputs';
import styled from '@emotion/styled';
import { ExtendedNavTypesProps } from '../types/navTypes';

const 닉네임입력 = ({
  onPrev,
  onNext,
  handleRegisterValue,
  registerValues,
}: ExtendedNavTypesProps) => {
  const [isActive, setIsActive] = useState(false);
  const [nickName, setNickName] = useState(registerValues.nickname);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (nickName) setIsActive(true);
    else setIsActive(false);
  }, [nickName]);

  const handleSubmit = () => {
    if (handleRegisterValue) {
      handleRegisterValue({ ...registerValues, nickname: nickName });
    }
    //중복일경우
    setIsValid(true);
    onNext();
  };

  return (
    <>
      <RegisterHeader percent={55} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>프로필 등록을 시작할게요!</St.Title>
            <St.Title>이름 또는 닉네임을 알려주세요</St.Title>
          </TitleBox>
          <div
            css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
          >
            <RegisterBasicInput label="닉네임">
              <StBasicInput
                type="text"
                placeholder="닉네임은 8자 이내로 입력할 수 있어요."
                value={nickName}
                onChange={(e) => setNickName(e.target.value.slice(0, 8))}
              />
              {isValid && (
                <StErrorExplain>
                  해당 닉네임은 이미 존재해요. 다시 입력해 주세요.
                </StErrorExplain>
              )}
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

export default 닉네임입력;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;
