import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import instance from '../../common/apis/axiosInstanse';
import { MatchDatatypes } from '../../main/types/MatchDatatypes';
import Map from '../../common/components/Map';
import { Xicon } from '../../main/assets/svgs';

const InfoModal = ({
  nickname,
  chatRoomId,
  closeModal,
}: {
  nickname: string;
  chatRoomId: number | undefined;
  closeModal: () => void;
}) => {
  const [matchData, setMatchData] = useState<MatchDatatypes | undefined>();
  const [isClickedMarker, setIsClickedMarker] = useState<{
    title: string;
    address: string;
  } | null>(null);
  const title = `${nickname} 님이 알려주신\n 만남이 가능한 시간대와 장소에요`;

  const ClickXBtn = () => {
    closeModal();
  };

  const handlePossibleInfo = async () => {
    try {
      const res = await instance.get(`/api/chat/room/${chatRoomId}/info`);
      setMatchData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlePossibleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sliceFirstDay = (day: string) => {
    return day.slice(0, 1);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOutsideClick = (e: any) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <StInfoModalContainer onClick={handleOutsideClick}>
      <StInfoModalWrapper>
        <StXButton type="button" onClick={ClickXBtn}>
          <Xicon />
        </StXButton>
        <StInfoTitle>{title}</StInfoTitle>
        <StPossibleWrapper>
          <StPossibleBox>
            <StPossibleTitle>🗓️ 가능한 요일</StPossibleTitle>
            <StPossibleContent>
              {matchData?.yoil ? (
                matchData.yoil.map((day: string, index: number) => (
                  <StPossibleValue key={index}>
                    {sliceFirstDay(day)}
                  </StPossibleValue>
                ))
              ) : (
                <StPossibleValue>없음</StPossibleValue>
              )}
            </StPossibleContent>
          </StPossibleBox>
          <StPossibleBox>
            <StPossibleTitle>⏰ 가능 시간대</StPossibleTitle>
            <StPossibleContent>
              {matchData?.time ? (
                matchData.time.map((timeSlot: string, index: number) => (
                  <StPossibleValue key={index}>{timeSlot}</StPossibleValue>
                ))
              ) : (
                <StPossibleValue>없음</StPossibleValue>
              )}
            </StPossibleContent>
          </StPossibleBox>
        </StPossibleWrapper>
        <StPlaceWrapper>
          <StPlaceMap>
            <Map
              matchData={matchData}
              setIsClickedMarker={setIsClickedMarker}
            />
          </StPlaceMap>
          <StPlaceBox>
            {isClickedMarker ? (
              <StPlaceInfo>{isClickedMarker.title}</StPlaceInfo>
            ) : (
              <StPlaceInfo>지도 내에 위치한 핀을 클릭해보세요!</StPlaceInfo>
            )}
          </StPlaceBox>
        </StPlaceWrapper>
      </StInfoModalWrapper>
    </StInfoModalContainer>
  );
};

export default InfoModal;

const StInfoModalContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 45rem;
  height: 100vh;
  background: rgb(0 0 0 / 50%);
  transform: translateX(-5%);
`;

const StInfoModalWrapper = styled.div`
  max-width: 32rem;
  padding-top: 3rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const StXButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  padding: 0 2.5rem;

  &:hover {
    cursor: pointer;
  }
`;

const StInfoTitle = styled.span`
  display: flex;
  padding: 2rem 2.5rem;
  line-height: 2.5rem;
  color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.subtitle2b};
`;

const StPossibleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 0.5rem 2rem;
  margin-bottom: 2rem;
`;

const StPossibleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 30rem;
  max-width: 30rem;
  height: 5.9rem;
  padding: 0 1.5rem;
  margin-top: 0.5rem;
  background: ${({ theme }) => theme.colors.gray0};
  border-radius: 17px;
`;

const StPossibleTitle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray8};
`;

const StPossibleContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;
  margin-right: 2rem;
  overflow-x: scroll;
`;

const StPossibleValue = styled.span`
  font-size: 1.2rem;
  font-style: normal;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray7};
  text-align: center;
`;

const StPlaceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.5rem 2.5rem;
`;

const StPlaceMap = styled.div`
  display: flex;
`;

const StPlaceBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 5.1rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
  background: ${({ theme }) => theme.colors.gray0};
  border-radius: 5px;
`;

const StPlaceInfo = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray6};
  ${({ theme }) => theme.fonts.body2b};

  text-align: center;
`;
