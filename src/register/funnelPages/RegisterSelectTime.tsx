import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import styled from '@emotion/styled';
import { ScheduleTypes } from '../types/scheduleTypes';
import { css } from '@emotion/react';
import { RegisterBasicInput } from '../components/RegisterInputs';
import { AVAILABLETIME } from '../constants/schedule';
import CheckBoxItem from '../components/CheckBoxItem';

interface ScedultPropsTypes {
  onPrev: () => void;
  onNext: () => void;
  handleScheduleValue: (data: ScheduleTypes) => void;
  registerScheduleValues: ScheduleTypes;
  percent: number;
}

const 지역선택 = ({
  onPrev,
  onNext,
  handleScheduleValue,
  registerScheduleValues,
}: ScedultPropsTypes) => {
  const [isActive, setIsActive] = useState(false);
  const [thisValues] = useState<string[]>(registerScheduleValues.yoilList);
  const [thisTimeValues, setThisTimeValues] = useState<string[]>(
    registerScheduleValues.availableTimeList,
  );

  useEffect(() => {
    if (thisTimeValues.length) setIsActive(true);
    else setIsActive(false);
  }, [thisValues, thisTimeValues]);

  const handleSubmit = () => {
    if (handleScheduleValue) {
      handleScheduleValue({
        ...registerScheduleValues,
        yoilList: thisValues,
        availableTimeList: thisTimeValues,
      });
      onNext();
    }
  };

  return (
    <>
      <RegisterHeader percent={55} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>봄 축제 기간 동안 상대방과의 </St.Title>
            <St.Title>만남이 가능한 시간대를 알려주세요</St.Title>
          </TitleBox>
          <div css={subTitleBoxStyles}>
            <St.SubTitle>
              봄 축제 기간인 목요일과 금요일에 만남이 가능한 시간을
            </St.SubTitle>
            <St.SubTitle>
              모두 선택해 주세요. 상대방과의 약속을 잡을 때 쓰여요.
            </St.SubTitle>
          </div>

          <div
            css={{ display: 'flex', flexDirection: 'column', gap: '3.9rem' }}
          >
            <RegisterBasicInput
              label="만남 가능 시간"
              explain="시간은 한 시간 단위로 선택이 가능해요."
            >
              <div css={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                {AVAILABLETIME.map((item) => (
                  <CheckBoxItem
                    key={item.value}
                    value={item.value}
                    name="availableTime"
                    setValues={setThisTimeValues}
                    label={item.label}
                    values={thisTimeValues}
                  />
                ))}
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

export default 지역선택;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 1.6rem;
`;

const subTitleBoxStyles = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 5.3rem;
`;
