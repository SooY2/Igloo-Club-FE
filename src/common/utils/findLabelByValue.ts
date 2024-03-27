interface Item {
  value: string;
  label: string;
}

/** value값으로 label을 찾는 함수입니다 */
export const findLabelByValue = (array: Item[], values: string[]) => {
  if (values.length === 0) return '';
  return values
    .map((value) => {
      const item = array.find((item) => item.value === value);
      return item ? item.label : '';
    })
    .filter((label) => label !== '')
    .join(', ');
};
