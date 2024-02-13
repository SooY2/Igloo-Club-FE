import styled from '@emotion/styled';

interface PlaceInfoTypes {
  name: string;
  emoji: string;
  text1: string;
  text2: string;
  btn: string;
}

interface PlaceCardProps {
  placeInfo: PlaceInfoTypes;
  handleRadioChange: (place: string) => void;
  checkedValue: string;
}

const PlaceCrad = ({
  placeInfo,
  handleRadioChange,
  checkedValue,
}: PlaceCardProps) => {
  const { name, emoji, text1, text2, btn } = placeInfo;
  const isChecked = checkedValue === name;
  return (
    <label>
      <StRadioInput
        type="radio"
        name="location"
        value={name}
        onChange={() => handleRadioChange(name)}
        checked={checkedValue === name}
      />
      <StContainer>
        <StEmoji>{emoji}</StEmoji>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            alignItems: 'center',
          }}
        >
          <StText isChecked={isChecked}>{text1}</StText>
          <StText isChecked={isChecked}>{text2}</StText>
        </div>

        <StBtn isChecked={isChecked}>{btn}</StBtn>
      </StContainer>
    </label>
  );
};

export default PlaceCrad;

const StRadioInput = styled.input`
  display: none;
`;

const StContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  align-items: center;
  justify-content: center;
  width: 17rem;
  height: 25rem;
  background-color: ${({ theme }) => theme.colors.gray0};
  border: 1px solid ${({ theme }) => theme.colors.gray0};
  border-radius: 20px;

  ${StRadioInput}:checked + & {
    color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.alpha10_primary};
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StEmoji = styled.p`
  font-size: 5rem;
`;

const StText = styled.p<{ isChecked: boolean }>`
  color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.black : theme.colors.gray5};
  ${({ theme }) => theme.fonts.body2b};
`;

const StBtn = styled.div<{ isChecked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 6.1rem;
  height: 2.6rem;
  color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.primary : theme.colors.gray7};
  background-color: ${({ theme, isChecked }) =>
    isChecked ? theme.colors.alpha20_primary : theme.colors.gray4};
  border-radius: 20px;
  ${({ theme }) => theme.fonts.body2b};
`;
