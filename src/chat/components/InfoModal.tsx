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
  chatRoomId: number;
  closeModal: () => void;
}) => {
  const [matchData, setMatchData] = useState<MatchDatatypes | undefined>();
  const title = `${nickname} 님이 알려주신\n 만남이 가능한 시간대와 장소에요`;

  const ClickXBtn = () => {
    closeModal();
  };

  const handlePossibleInfo = async () => {
    try {
      const res = await instance.get(`/api/chat/room/${chatRoomId}/info`);
      setMatchData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handlePossibleInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
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
            {matchData?.yoil
              ? matchData.yoil.map((day: string, index: number) => (
                  <>
                    {' '}
                    <StPossibleContent key={index}>{day}</StPossibleContent>
                  </>
                ))
              : null}
          </StPossibleBox>
          <StPossibleBox>
            <StPossibleTitle>⏰ 가능 시간대</StPossibleTitle>
            {matchData?.time
              ? matchData.time.map((timeSlot: string, index: number) => (
                  <StPossibleContent key={index}>{timeSlot}</StPossibleContent>
                ))
              : null}
          </StPossibleBox>
        </StPossibleWrapper>
        <StPlaceWrapper>
          <StPlaceMap>
            <Map matchData={matchData} />
          </StPlaceMap>
          <StPlaceBox>
            <StPlaceInfo></StPlaceInfo>
          </StPlaceBox>
        </StPlaceWrapper>
      </StInfoModalWrapper>
    </StInfoModalContainer>
  );
};

export default InfoModal;

const StInfoModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 42.5rem;
  height: 100vh;
  background: rgb(0 0 0 / 50%);
`;

const StInfoModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  max-width: 32rem;
  height: 59rem;
  padding-top: 2rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const StXButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
  padding: 0 2.5rem;
`;

const StInfoTitle = styled.span`
  display: flex;
  padding: 1.5rem 2.5rem;
  line-height: 2.5rem;
  color: ${({ theme }) => theme.colors.gray9};
  ${({ theme }) => theme.fonts.subtitle2b};
`;

const StPossibleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  padding: 0%.5rem 2rem;
`;

const StPossibleBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 28rem;
  height: 5.9rem;
  padding: 0 1.5rem;
  margin-top: 0.9rem;
  background: ${({ theme }) => theme.colors.gray0};
  border-radius: 17px;
`;

const StPossibleTitle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-right: 2rem;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gray8};
`;

const StPossibleContent = styled.span`
  padding: 0 1rem;
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
  background: #fafafa;
  border-radius: 5px;
`;

const StPlaceInfo = styled.span`
  color: ${({ theme }) => theme.colors.gray7};
  ${({ theme }) => theme.fonts.body2b};

  text-align: center;
`;
