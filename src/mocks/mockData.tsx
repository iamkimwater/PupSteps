import {User, WalkArea} from './mockdataTypes';

const cities = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '강원도',
  '충청북도',
  '충청남도',
  '전라북도',
  '전라남도',
  '경상북도',
  '경상남도',
  '제주특별자치도',
];
const districts = [
  '강남구',
  '서초구',
  '중구',
  '영등포구',
  '송파구',
  '마포구',
  '용산구',
  '성북구',
  '노원구',
  '은평구',
  '동대문구',
  '관악구',
  '구로구',
  '강서구',
  '양천구',
  '동작구',
  '서대문구',
  '종로구',
  '금천구',
  '성동구',
  '광진구',
  '중랑구',
  '도봉구',
  '강북구',
  '금정구',
  '해운대구',
  '수영구',
  '연제구',
  '남구',
  '동구',
  '부산진구',
  '북구',
  '강서구',
  '서구',
  '사하구',
  '사상구',
  '기장군',
];
const petNames = [
  'Charlie',
  'Max',
  'Bella',
  'Milo',
  'Lucy',
  'Rocky',
  'Lola',
  'Oliver',
  'Sadie',
  'Daisy',
];
const breeds = [
  'Labrador',
  'Poodle',
  'German Shepherd',
  'Golden Retriever',
  'Bulldog',
  'Beagle',
  'Pomeranian',
  'Rottweiler',
  'Yorkshire Terrier',
  'Boxer',
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMockUser(i: number): User {
  const walkArea: WalkArea = {
    city: cities[getRandomInt(0, cities.length - 1)],
    district: districts[getRandomInt(0, districts.length - 1)],
  };

  return {
    email: `user${i}@example.com`,
    password: `password${i}`,
    petName: petNames[getRandomInt(0, petNames.length - 1)],
    breed: breeds[getRandomInt(0, breeds.length - 1)],
    age: getRandomInt(1, 10),
    mainWalkArea: walkArea,
  };
}

export const mockData: User[] = Array.from({length: 200}, (_, i) =>
  createMockUser(i),
);