import { useEffect, useState } from 'react';
import RegisterBtn from '../components/RegisterBtn';
import RegisterHeader from '../components/RegisterHeader';
import * as St from '../styles/registerStyles';
import styled from '@emotion/styled';
import { ScheduleTypes } from '../types/scheduleTypes';
import CheckBoxItem from '../components/CheckBoxItem';
import { markerImg } from '../assets/images/0_index';
import instance from '../../common/apis/axiosInstanse';
import { markerInfoType } from '../types/markerInfoTypes';

interface ScedultPropsTypes {
  onPrev: () => void;
  onNext: () => void;
  registerScheduleValues: ScheduleTypes;
  percent: number;
}

const 장소선택 = ({
  onPrev,
  onNext,
  registerScheduleValues,
}: ScedultPropsTypes) => {
  const [isActive, setIsActive] = useState(false);
  const [thisValues, setThisValues] = useState<string[]>(
    registerScheduleValues.markerList,
  );
  const [markerList, setMarkerList] = useState<markerInfoType[]>([]);

  useEffect(() => {
    getMarker();
  }, []);

  useEffect(() => {
    if (thisValues.length) setIsActive(true);
    else setIsActive(false);
  }, [thisValues]);

  const getMarker = async () => {
    try {
      const { data } = await instance.get(
        `/api/markers?location=${registerScheduleValues.location}`,
      );
      setMarkerList(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      await instance.patch('api/member/schedule', {
        ...registerScheduleValues,
        markerList: thisValues,
      });
      await instance.post('/api/nungil/addRecommendNungil', {});
      onNext();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <RegisterHeader percent={55} onPrev={onPrev} />
      <article css={St.articleStyles}>
        <section css={St.sectionStyles}>
          <TitleBox>
            <St.Title>첫만남에 적합한 장소를 꼽아봤어요</St.Title>
            <St.Title>가능한 장소들을 선택해 주세요</St.Title>
          </TitleBox>
          <div css={{ overflow: 'scroll', height: 'calc(100vh - 36rem)' }}>
            <div
              css={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem',
              }}
            >
              {markerList.length > 0 ? (
                <>
                  {markerList.map((item) => {
                    return (
                      <CheckBoxItem
                        key={item.title}
                        value={item.value}
                        name="markerList"
                        setValues={setThisValues}
                        values={thisValues}
                      >
                        <div
                          css={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.5rem',
                          }}
                        >
                          <StCradTitle>
                            <img src={markerImg} />
                            <p>{item.title}</p>
                          </StCradTitle>
                          <StAddress>{item.address}</StAddress>
                        </div>
                      </CheckBoxItem>
                    );
                  })}
                </>
              ) : (
                <>Loading,,</>
              )}
            </div>
          </div>
        </section>
        <RegisterBtn
          isActive={isActive}
          content={`총 ${thisValues.length}개의 장소를 선택했어요`}
          onClick={handleSubmit}
        />
      </article>
    </>
  );
};

export default 장소선택;

const TitleBox = styled(St.TitleBox)`
  margin-bottom: 1.6rem;
`;

const StCradTitle = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  ${({ theme }) => theme.fonts.body1b};
`;

const StAddress = styled.p`
  color: ${({ theme }) => theme.colors.gray5};
  ${({ theme }) => theme.fonts.body2m};
`;
