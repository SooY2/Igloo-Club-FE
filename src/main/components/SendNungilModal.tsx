import { useState } from 'react';
import styled from '@emotion/styled';
import instance from '../../common/apis/axiosInstanse';
import { Xicon } from '../assets/svgs';
import { Check } from '../assets/svgs';
import { CheckPink } from '../assets/svgs';

const SendNungilModal = ({
  nungilId,
  nickname,
  successApi,
  closeModal,
}: {
  nungilId: number;
  nickname: string;
  successApi: () => void;
  closeModal: () => void;
}) => {
  const [isApiSuccess, setIsApiSuccess] = useState<boolean>(false);

  const title = `${nickname} 님에게\n 눈길을 보내시겠어요?`;
  const completement =
    '눈길 보내기를 완료했어요!\n 당신의 인연과 빠르게 매칭해드릴게요 ⚡️';

  const ClickSendBtn = async () => {
    try {
      await instance.post('/api/nungil/send?', null, {
        params: {
          nungilId: nungilId,
        },
      });
      setIsApiSuccess(true);
      successApi();
    } catch (error) {
      console.log(error);
    }
  };

  const handleOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  return (
    <StModalContainer onClick={handleOutsideClick}>
      <StModalWrapper>
        <StXBtn type="button" onClick={closeModal}>
          <Xicon />
        </StXBtn>
        <StModalTitle>{title}</StModalTitle>
        {isApiSuccess ? (
          <StFinishBtnBox>
            <StFinishBtn type="button" onClick={closeModal}>
              <CheckPink />
              <StFinishMent>네, 눈길을 보낼게요</StFinishMent>
            </StFinishBtn>
            <StCompleteMent>{completement}</StCompleteMent>
          </StFinishBtnBox>
        ) : (
          <StAcceptBtnBox>
            <StModalSubTitle>
              보낸 눈길은 상대방의 수락 후 매칭돼요
            </StModalSubTitle>
            <StAcceptBtn type="button">
              <Check />
              <StAcceptMent onClick={ClickSendBtn}>
                네, 눈길을 보낼게요
              </StAcceptMent>
            </StAcceptBtn>
            <StNoBtn>
              <StNoMent onClick={closeModal}>조금 더 고민해 볼게요</StNoMent>
            </StNoBtn>
          </StAcceptBtnBox>
        )}
      </StModalWrapper>
    </StModalContainer>
  );
};

export default SendNungilModal;

const StModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 50%);
`;

const StModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 34rem;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 10px;
`;

const StXBtn = styled.button`
  display: flex;
  flex-direction: row;
  padding-top: 2rem;
  padding-left: 28rem;
`;

const StModalTitle = styled.span`
  display: flex;
  padding-top: 1.5rem;
  font-size: 1.8rem;
  font-style: normal;
  font-weight: 700;
  line-height: 2.5rem;
  text-align: center;
`;

const StModalSubTitle = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 1.5rem;
  color: ${({ theme }) => theme.colors.gray7};
  ${({ theme }) => theme.fonts.body1m};
`;

const StAcceptBtnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StAcceptBtn = styled.button`
  display: flex;
  flex-direction: row;
  gap: 1.1rem;
  align-items: center;
  justify-content: center;
  min-width: 29rem;
  height: 4.2rem;
  margin-top: 2.2rem;
  background: #f8f9fd;
  border: 1px solid #e9ebec;
  border-radius: 20px;
`;

const StAcceptMent = styled.span`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  color: #656f7d;
`;

const StNoBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;
  margin-top: 1.9rem;
  background: ${({ theme }) => theme.colors.white};
`;

const StNoMent = styled.span`
  color: ${({ theme }) => theme.colors.gray6};
  ${({ theme }) => theme.fonts.body2m};
`;

const StFinishBtnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StFinishBtn = styled.button`
  display: flex;
  flex-direction: row;
  gap: 1.1rem;
  align-items: center;
  justify-content: center;
  min-width: 29rem;
  height: 4.2rem;
  margin-top: 2rem;
  background: rgb(250 114 104 / 20%);
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
`;

const StFinishMent = styled.span`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
`;

const StCompleteMent = styled.span`
  padding-top: 1.5rem;
  padding-bottom: 3rem;
  font-size: 1.3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: #4dca9a;
  text-align: center;
`;
