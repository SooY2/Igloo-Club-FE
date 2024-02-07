import styled from '@emotion/styled';

const InfoModal = () => {
  // const title = '';
  return (
    <StInfoModalContainer>
      <StInfoTitle></StInfoTitle>
    </StInfoModalContainer>
  );
};

export default InfoModal;

const StInfoModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StInfoTitle = styled.span`
  display: flex;
`;
