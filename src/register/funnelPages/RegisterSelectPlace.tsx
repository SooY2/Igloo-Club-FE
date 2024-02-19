import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import styled from '@emotion/styled';
import PlaceCrad from '../components/PlaceCrad';
import { ScheduleTypes } from '../types/scheduleTypes';
import { PlaceCardConstants } from '../constants/schedule';

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
  percent,
}: ScedultPropsTypes) => {
  const [isActive, setIsActive] = useState(false);
  const [selectPlace, setSelectPlace] = useState('');

  useEffect(() => {
    if (selectPlace) setIsActive(true);
    else setIsActive(false);
  }, [selectPlace]);

  const handleSubmit = () => {
    if (handleScheduleValue) {
      handleScheduleValue({ ...registerScheduleValues, location: selectPlace });
      onNext();
    }
  };

  const handleRadioChange = (place: string) => {
    setSelectPlace(place);
  };

  return (
    <>
      <RegisterHeader percent={percent} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>회원님이 만남 가능한 지역을</St.Title>
            <St.Title>둘 중 선택해주세요</St.Title>
          </TitleBox>

          <main css={{ display: 'flex', gap: '1.1rem' }}>
            {PlaceCardConstants.map((placeInfo) => {
              return (
                <PlaceCrad
                  key={placeInfo.text1}
                  placeInfo={placeInfo}
                  handleRadioChange={handleRadioChange}
                  checkedValue={selectPlace}
                />
              );
            })}
          </main>
        </section>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.7rem',
          }}
        >
          <St.StBtnExplain>현재는 광화문만 지원해요</St.StBtnExplain>
          <RegisterBtn
            isActive={isActive}
            content="다음으로"
            onClick={handleSubmit}
          />
        </div>
      </article>
    </>
  );
};

export default 지역선택;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 5.4rem;
`;
