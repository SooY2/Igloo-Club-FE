import { useState } from 'react';
import { Arrow } from '../assets/svgs';

const CustomSelect = () => {
  const [selected, setSelected] = useState('광화문');
  const selectList = ['광화문', '판교'];

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const SelectBtn = () => {
    handleSelect(selected === '광화문' ? '판교' : '광화문');
  };

  return (
    <div css={Container}>
      <select css={SelectBox} onChange={handleSelect} value={selected}>
        {selectList.map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <button type="button" onClick={SelectBtn}>
        <Arrow />
      </button>
    </div>
  );
};

export default CustomSelect;
