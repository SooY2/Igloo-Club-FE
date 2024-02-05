import { toArray } from 'lodash-es';

export const limitMaxLength = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>,
  MaxLength: number,
) => {
  const parsedValue = toArray(e.target.value);

  if (!parsedValue) return;

  //글자 수가 최대 글자 수를 넘으면 splice
  if (parsedValue.length > MaxLength) {
    e.target.value = parsedValue.splice(0, MaxLength).join('');
    return;
  }

  // 실시간 글자 수 반영을 위한 값 return
  return parsedValue.length;
};
