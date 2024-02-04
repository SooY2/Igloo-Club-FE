import {
  bearImg,
  catImg,
  deerImg,
  dogImg,
  foxImg,
  horseImg,
  rabbitImg,
  tRexImg,
  wolfImg,
} from '../assets/images/0_index';

export const ANIMALIMAGES = [
  { animalImg: dogImg, label: '강아지상', value: 'DOG' },
  { animalImg: catImg, label: '고양이상', value: 'CAT' },
  { animalImg: foxImg, label: '여우상', value: 'FOX' },
  { animalImg: wolfImg, label: '늑대상', value: 'WOLF' },
  { animalImg: deerImg, label: '사슴상', value: 'DEER' },
  { animalImg: rabbitImg, label: '토끼상', value: 'RABBIT' },
  { animalImg: bearImg, label: '곰상', value: 'BEAR' },
  { animalImg: horseImg, label: '말상', value: 'HORSE' },
  { animalImg: tRexImg, label: '공룡상', value: 'DINO' },
];

export const RELIGION = [
  { value: 'NONE', label: '종교 없음' },
  { value: `CHRISTIANITY`, label: '기독교' },
  { value: 'CATHOLICISM', label: '천주교' },
  { value: 'BUDDHISM', label: '불교' },
  { value: 'OTHER', label: '기타' },
];

export const MBTI = [
  { name: 'mbti1', value1: 'I', value2: 'E' },
  { name: 'mbti2', value1: 'S', value2: 'N' },
  { name: 'mbti3', value1: 'T', value2: 'F' },
  { name: 'mbti4', value1: 'J', value2: 'P' },
];

export const SMOKE = [
  { value: 'NONE', label: '비흡연(금연)' },
  { value: `OCCASIONAL`, label: '가끔 피움' },
  { value: 'ALWAYS', label: '매일 피움' },
];

export const ALCOHOL = [
  { value: 'NONE', label: '비음주(금주)' },
  { value: `OCCASIONAL`, label: '사회적 음주' },
  { value: 'MODERATE', label: '월 4회 미만' },
  { value: 'HEAVY', label: '월 5회 이상' },
];
