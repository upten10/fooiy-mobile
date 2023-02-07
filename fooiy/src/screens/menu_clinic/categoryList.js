export const categoryToKorean = {
  CUTLET: '돈까스',
  RAW_SUSHI: '회/초밥',
  JAPANESE: '일식',
  CHINESE: '중식',
  CHICKEN: '치킨',
  KOREAN: '한식',
  SEAFOOD: '해산물',
  NOODLE: '국수',
  SNACKBAR: '분식',
  BURGER: '햄버거',
  PIZZA: '피자',
  WESTERN: '양식',
  MEAT_ROAST: '고기/구이',
  PETTITOES_BOSSAM: '족발/보쌈',
  ASIAN: '아시안',
  TOAST_SANDWICH: '토스트/샌드위치',
  LUNCHBOX_PORRIDGE: '도시락/죽',
  SALAD: '샐러드',
  PUB: '요리주점',
};

export const categoryToEnglish = {
  CUTLET: 'CUTLET',
  RAW_SUSHI: 'RAW/SUSHI',
  JAPANESE: 'JAPANESE',
  CHINESE: 'CHINESE',
  CHICKEN: 'CHICKEN',
  KOREAN: 'KOREAN',
  SEAFOOD: 'SEAFOOD',
  NOODLE: 'NOODLE',
  SNACKBAR: 'SNACKBAR',
  BURGER: 'BURGER',
  PIZZA: 'PIZZA',
  WESTERN: 'WESTERN',
  MEAT_ROAST: 'MEAT/ROAST',
  PETTITOES_BOSSAM: 'PETTITOES/BOSSAM',
  ASIAN: 'ASIAN',
  TOAST_SANDWICH: 'TOAST/SANDWICH',
  LUNCHBOX_PORRIDGE: 'LUNCHBOX/PORRIDGE',
  SALAD: 'SALAD',
  PUB: 'PUB',
};

function shuffle() {
  const array = [
    'CUTLET',
    'RAW_SUSHI',
    'JAPANESE',
    'CHINESE',
    'CHICKEN',
    'KOREAN',
    'SEAFOOD',
    'NOODLE',
    'SNACKBAR',
    'BURGER',
    'PIZZA',
    'WESTERN',
    'MEAT_ROAST',
    'PETTITOES_BOSSAM',
    'ASIAN',
    'TOAST_SANDWICH',
    'LUNCHBOX_PORRIDGE',
    'SALAD',
    'PUB',
  ];
  array.sort(() => Math.random() - 0.5);
  return array;
}

export const categoryList = shuffle();
