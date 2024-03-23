import { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import instance from '../../common/apis/axiosInstanse';
import { theme } from '../../common/styles/theme';
import { Arrow } from '../assets/svgs/index';

const CustomSelect = ({
  onSelectedChange,
}: {
  onSelectedChange: (selected: string) => void;
}) => {
  const [selected, setSelected] = useState<string>('서울 광화문');
  const selectList = ['서울 광화문', '경기도 판교'];
  const [showToggle, setShowToggle] = useState<boolean>(false);

  const handleChangePlace = async () => {
    let place = '';

    if (selected === '서울 광화문') {
      place = 'GWANGHWAMUN';
    } else if (selected === '경기도 판교') {
      place = 'PANGYO';
    }

    try {
      await instance.patch('/api/member/location', { location: place });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = (value: string) => {
    if (selected === '서울 광화문') {
      setSelected(value);
      setShowToggle(false);
    } else if (selected === '경기도 판교') {
      setSelected(value);
      setShowToggle(false);
      onSelectedChange(selected);
    }
  };

  const fetchData = async () => {
    await handleChangePlace();
    onSelectedChange(selected);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleToggle = () => {
    setShowToggle((prev) => !prev);
  };

  return (
    <div css={Container}>
      <div css={SelectBox} onClick={handleToggle}>
        <span css={SelectValue}>{selected}</span>
        <Arrow />
      </div>
      {showToggle && (
        <div css={OptionBox}>
          {selectList.map((item) => (
            <div key={item} css={Option} onClick={() => handleSelect(item)}>
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;

const Container = css`
  display: flex;
  gap: 0.5rem;
`;

const SelectBox = css`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding-right: 0.2rem;
  ${theme.fonts.body1b};

  &:hover {
    cursor: pointer;
  }
`;

const SelectValue = css`
  color: ${theme.colors.gray7};
  border-bottom: 2px solid ${theme.colors.gray7};
`;

const OptionBox = css`
  position: absolute;
  left: 20;
  width: 9rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.3rem;
  margin-top: 2rem;
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray2};
  border-radius: 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%);
`;

const Option = css`
  padding: 0.5rem;
  ${theme.fonts.subtitle1b}

  color: ${theme.colors.gray6};
  cursor: pointer;

  &:hover {
    background-color: ${theme.colors.gray0};
  }
`;
