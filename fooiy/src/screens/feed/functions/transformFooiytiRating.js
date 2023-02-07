const transformFooiytiRating = taste_evaluation => {
  if (taste_evaluation >= 99) {
    return 4;
  } else if (taste_evaluation >= 70) {
    return 3;
  } else if (taste_evaluation >= 50) {
    return 2;
  } else if (taste_evaluation >= 30) {
    return 1;
  } else if (taste_evaluation >= 10) {
    return 0;
  }
};

export default transformFooiytiRating;
