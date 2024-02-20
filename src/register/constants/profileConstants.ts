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

export const FACEDEPICTION = [
  { value: 'PRETTY_EYES', label: '예쁜 눈' },
  { value: 'BOLD_EYEBROWS', label: '짙은 눈썹' },
  { value: 'ATTRACTIVE_VOICE', label: '매력적인 목소리' },
  { value: 'TALL', label: '키가 커요' },
  { value: 'PETITE', label: '키가 아담해요' },
  { value: 'SLIM', label: '슬림해요' },
  { value: 'MUSCULAR', label: '근육질 몸매에요' },
  { value: 'SLIGHTLY_PLUMP', label: '약간 통통해요' },
  { value: 'BROAD_SHOULDERS', label: '어깨가 넓어요' },
  { value: 'STRONG_LOWER_BODY', label: '하체가 튼튼해요' },
  { value: 'BABY_FACE', label: '동안이에요' },
  { value: 'LONG_LEGS', label: '다리가 길어요' },
  { value: 'THICK_HAIR', label: '머리숱이 많아요' },
  { value: 'BIG_EYES', label: '눈이 커요' },
  { value: 'EYE_SMILE', label: '눈웃음이 예뻐요' },
  { value: 'SHARP_NOSE', label: '코가 오똑해요' },
  { value: 'CLEAN_JAWLINE', label: '턱선이 깔끔해요' },
  { value: 'CUTE_CHEEKS', label: '볼살이 귀여워요' },
  { value: 'ANGULAR_FACE', label: '얼굴형이 각진 편이에요' },
  { value: 'ROUND_FACE', label: '얼굴형이 둥근 편이에요' },
  { value: 'BRIGHT_SKIN', label: '피부톤이 밝아요' },
  { value: 'FASHION_SENSE', label: '패션감각이 좋아요' },
  { value: 'EXOTIC_LOOKS', label: '외모가 이국적이에요' },
];

export const PERSONALITYDEPICTION = [
  { value: 'POLITE', label: '예의가 발라요' },
  { value: 'EXPRESSIVE', label: '표현을 잘해요' },
  { value: 'ACTIVE', label: '활발해요' },
  { value: 'SOCIABLE', label: '사교적이에요' },
  { value: 'CALM', label: '차분해요' },
  { value: 'KIND', label: '친절해요' },
  { value: 'CONSIDERATE', label: '배려를 잘해요' },
  { value: 'GOOD_SENSE_OF_HUMOR', label: '유머 감각이 좋아요' },
  { value: 'DILIGENT', label: '성실해요' },
  { value: 'METICULOUS', label: '꼼꼼해요' },
  { value: 'RESPONSIBLE', label: '책임감이 강해요' },
  { value: 'OPTIMISTIC', label: '낙천적이에요' },
  { value: 'EMPATHETIC', label: '공감능력이 뛰어나요' },
  { value: 'PASSIONATE', label: '열정적이에요' },
  { value: 'WELL_PLANNED', label: '계획적이에요' },
  { value: 'CUTE', label: '애교가 많아요' },
  { value: 'GOOD_LISTENER', label: '이야기를 잘 들어줘요' },
  { value: 'GOOD_HORSE', label: '말을 잘해요' },
  { value: 'FRIENDLY', label: '다정해요' },
  { value: 'JOKER', label: '장난기가 많아요' },
  { value: 'LAUGHER', label: '웃음이 많아요' },
  { value: 'GOOD_LIFE', label: '생활력이 좋아요' },
];

export const HOBBY = [
  { value: 'LISTENING_TO_MUSIC', label: '🎶 음악 감상' },
  { value: 'COOKING', label: '🍳 요리하기' },
  { value: 'TRAVELING', label: '✈️ 여행가기' },
  { value: 'WATCHING_MOVIES', label: '🎬 영화보기' },
  { value: 'READING', label: '📚 책읽기' },
  { value: 'EXERCISING', label: '💪🏻 운동하기' },
  { value: 'PAINTING', label: '🎨 그림그리기' },
  { value: 'PHOTOGRAPHY', label: '📷 사진찍기' },
  { value: 'HIKING', label: '🥾 등산하기' },
  { value: 'CYCLING', label: '🚲 자전거타기' },
  { value: 'DANCING', label: '💃 춤추기' },
  { value: 'PLAYING_INSTRUMENTS', label: '🎸 악기' },
  { value: 'SWIMMING', label: '🏊‍♀️ 수영하기' },
  { value: 'GAMING', label: '🎮 게임하기' },
  { value: 'WRITING', label: '📝 글쓰기' },
  { value: 'LEARNING_LANGUAGES', label: '🌐 외국어 배우기' },
  { value: 'DRINKING', label: '🍻 술' },
  { value: 'WATCHING_DRAMAS', label: '📺 드라마보기' },
  { value: 'SURFING', label: '🏄‍♀️ 서핑' },
  { value: 'WATCHING_SPORTS', label: '🏂 스포츠 관람' },
  { value: 'WATCHING_ANIMATION', label: '🕹️ 애니메이션' },
  { value: 'PET_CARE', label: '🐕 반려동물' },
  { value: 'WALKING', label: '🚶‍♀️ 산책' },
  { value: 'READING_WEBTOONS', label: '💥 웹툰' },
  { value: 'INVESTING', label: '📈 재테크' },
  { value: 'VISITING_EXHIBITIONS', label: '🎡 전시회' },
  { value: 'CAMPING', label: '🏕️ 캠핑' },
  { value: 'FITNESS', label: '🏋️‍♂️ 헬스' },
];
