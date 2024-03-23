import {
  Fox,
  Dog,
  Rabbit,
  Dino,
  Deer,
  Wolf,
  Horse,
  Cat,
  Bear,
} from '../assets/svgs/index';

const AnimalProfile = ({ animalFace }: { animalFace: string }) => {
  let AnimalFace;

  switch (animalFace) {
    case '여우상':
      AnimalFace = Fox;
      break;
    case '강아지상':
      AnimalFace = Dog;
      break;
    case '토끼상':
      AnimalFace = Rabbit;
      break;
    case '공룡상':
      AnimalFace = Dino;
      break;
    case '사슴상':
      AnimalFace = Deer;
      break;
    case '늑대상':
      AnimalFace = Wolf;
      break;
    case '말상':
      AnimalFace = Horse;
      break;
    case '고양이상':
      AnimalFace = Cat;
      break;
    case '곰상':
      AnimalFace = Bear;
      break;
    case 'FOX':
      AnimalFace = Fox;
      break;
    case 'DOG':
      AnimalFace = Dog;
      break;
    case 'RABBIT':
      AnimalFace = Rabbit;
      break;
    case 'DINO':
      AnimalFace = Dino;
      break;
    case 'DEER':
      AnimalFace = Deer;
      break;
    case 'WOLF':
      AnimalFace = Wolf;
      break;
    case 'HORSE':
      AnimalFace = Horse;
      break;
    case 'CAT':
      AnimalFace = Cat;
      break;
    case 'BEAR':
      AnimalFace = Bear;
      break;
    default:
      break;
  }

  return <div>{AnimalFace && <AnimalFace />}</div>;
};

export default AnimalProfile;
