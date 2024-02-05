export interface Registertypes {
  nickname: string;
  sex: string;
  birthdate: string;
  contactKakao?: string | null;
  contactInstagram?: string | null;
  animalFace: string;
  job: string;
  height: number | string;
  mbti: string;
  marriageState: string;
  religion: string;
  alcohol: string;
  smoke: string;
  faceDepictionList: string[];
  personalityDepictionList: string[];
  description: string;
  // 선택 사항
  markerList?: string[];
  hobbyList: string[];
}
